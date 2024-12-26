import { z } from "zod";

import { absoluteUploadsDirection } from "@/config/file-upload";
import { ApiError } from "@/lib/api/exceptions";
import { handleApiError, successResponse, validateUser } from "@/lib/api/lib";
import { authOptions } from "@/lib/auth";
import { deleteFileByNameFromDatabase } from "@/lib/files/actions";
import { deleteFileFromLocalDirectory } from "@/lib/files/utils";

const routeContextSchema = z.object({
  params: z.object({
    filename: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    await validateUser(authOptions);

    const { params } = routeContextSchema.parse(context);

    const { success: isDeletedFromDatabase } =
      await deleteFileByNameFromDatabase(params.filename);

    if (!isDeletedFromDatabase) {
      throw new ApiError("CANT_DELETE_FILE_FROM_DATABASE", 422);
    }

    await deleteFileFromLocalDirectory(
      absoluteUploadsDirection,
      params.filename,
    );

    return successResponse(200, { message: "FILE_SUCCESSFULLY_DELETED" });
  } catch (error) {
    return handleApiError(error);
  }
}
