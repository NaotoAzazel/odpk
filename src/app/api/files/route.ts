import { Files as PrismaFile } from "@prisma/client";
import { ZodError } from "zod";

import {
  absoluteUploadsDirection,
  uploadFilesSchema,
} from "@/widgets/file-uploader";
import { authOptions, validateSession } from "@/features/auth";
import {
  generateUniqueFilename,
  getFileType,
  uploadFileToDatabase,
  uploadFileToLocalDirectory,
} from "@/entities/file";
import { ApiError } from "@/shared/exceptions";
import { handleApiError, successResponse } from "@/shared/lib";

export async function POST(req: Request) {
  try {
    await validateSession(authOptions);

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      throw new ApiError("INVALID_CONTENT_TYPE", 400);
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    const validation = uploadFilesSchema.safeParse({ files });
    if (!validation.success) {
      throw new ZodError(validation.error.issues);
    }

    let createdFiles: PrismaFile[] = [];

    for (const file of files) {
      const uniqueFilename = generateUniqueFilename(file);
      const fileType = getFileType(file);

      const { success: isUploadToDatabaseSuccess, addedFile } =
        await uploadFileToDatabase({
          filename: uniqueFilename,
          fileType,
        });

      if (!isUploadToDatabaseSuccess) {
        throw new ApiError("CANT_SAVE_FILE_TO_DATABASE", 422);
      }

      const { success: isUploadToLocalDirectorySuccess } =
        await uploadFileToLocalDirectory({
          file,
          absoluteFolderPath: absoluteUploadsDirection,
          filename: uniqueFilename,
        });

      if (!isUploadToLocalDirectorySuccess) {
        throw new ApiError("CANT_SAVE_FILE_TO_LOCAL_DIRECTORY", 422);
      }

      createdFiles.push(addedFile as PrismaFile);
    }

    return successResponse(200, {
      message: "FILES_SUCCESSFULLY_UPLOADED",
      data: createdFiles,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
