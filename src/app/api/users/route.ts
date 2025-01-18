import { authOptions, validateSession } from "@/features/auth";
import { createUser, getUserByEmail, userAuthSchema } from "@/entities/user";
import { ApiError } from "@/shared/exceptions";
import { handleApiError, hashPassword, successResponse } from "@/shared/lib";

export async function POST(req: Request) {
  try {
    await validateSession(authOptions);

    const json = await req.json();
    const body = userAuthSchema.parse(json);

    const existingUserByEmail = await getUserByEmail(body.email);
    if (existingUserByEmail) {
      throw new ApiError("USER_WITH_THIS_EMAIL_EXISTS", 409);
    }

    const hashedPassword = hashPassword(body.password);
    await createUser({ email: body.email, hashedPassword });

    return successResponse(200, { message: "USER_CREATED_SUCCESSFULLY" });
  } catch (error) {
    return handleApiError(error);
  }
}
