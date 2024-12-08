import { Files as PrismaFile } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { absoluteUploadsDirection } from "@/config/file-upload";
import { authOptions } from "@/lib/auth";
import { uploadFileToDatabase } from "@/lib/files/actions";
import {
  generateUniqueFilename,
  getFileType,
  uploadFileToLocalDirectory,
} from "@/lib/files/utils";
import { uploadFilesSchema } from "@/lib/validation/file-upload";

export async function POST(req: Request) {
  try {
    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return new Response("Not authorized", { status: 403 });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return new Response("Invalid content type", {
        status: 400,
      });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    const validation = uploadFilesSchema.safeParse({ files });
    if (!validation.success) {
      return new Response(
        validation.error.issues.map((issue) => issue.message).join(", "),
        { status: 422 },
      );
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
        return new Response(
          `Cant save to database file with name: ${file.name}`,
          { status: 422 },
        );
      }

      const { success: isUploadToLocalDirectorySuccess } =
        await uploadFileToLocalDirectory({
          file,
          absoluteFolderPath: absoluteUploadsDirection,
          filename: uniqueFilename,
        });

      if (!isUploadToLocalDirectorySuccess) {
        return new Response(
          `Cant save to local directory file with name: ${file.name}`,
          { status: 422 },
        );
      }

      createdFiles.push(addedFile as PrismaFile);
    }

    return new Response(JSON.stringify(createdFiles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        error.issues.map((issue) => issue.message).join(", "),
        { status: 422 },
      );
    }

    return new Response(JSON.stringify(error), { status: 500 });
  }
}
