import { z } from "zod";

import { absoluteUploadsDirection } from "@/widgets/file-uploader";
import { authOptions, validateSession } from "@/features/auth";
import {
  deleteFileByNameFromDatabase,
  deleteFileFromLocalDirectory,
} from "@/entities/file";
import { ApiError } from "@/shared/exceptions";
import { handleApiError, successResponse } from "@/shared/lib";

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
    await validateSession(authOptions);

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
