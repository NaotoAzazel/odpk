import { z } from "zod";

import { authOptions, validateSession } from "@/features/auth";
import { deleteUserById, getUserByEmail } from "@/entities/user";
import { ApiError } from "@/shared/exceptions";
import { handleApiError, successResponse } from "@/shared/lib";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const user = await validateSession(authOptions);

    const { params } = routeContextSchema.parse(context);

    if (user.id === params.userId) {
      throw new ApiError("YOU_CANT_DELETE_YOUR_ACCOUNT", 409);
    }

    const isUserExists = await getUserByEmail(user.email);
    if (!isUserExists) {
      throw new ApiError("USER_WITH_THIS_ID_NOT_FOUND", 409);
    }

    await deleteUserById({ userId: params.userId });

    return successResponse(200, { message: "USER_DELETED_SUCCESSFULLY" });
  } catch (error) {
    return handleApiError(error);
  }
}
