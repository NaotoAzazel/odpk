import { revalidateTag } from "next/cache";
import { FileTypes } from "@prisma/client";

import { unknownError } from "@/config/constants";
import { db } from "@/lib/db";

export async function getFiles() {
  const files = await db.files.findMany();
  return files;
}

interface UploadFileToDatabase {
  filename: string;
  fileType: FileTypes;
}

export async function uploadFileToDatabase({
  filename,
  fileType,
}: UploadFileToDatabase) {
  try {
    const addedFile = await db.files.create({
      data: { name: filename, type: fileType },
    });

    return { success: true, addedFile };
  } catch (error) {
    return {
      success: false,
      error: (error instanceof Error && error.message) || unknownError,
    };
  }
}

export async function deleteFileByNameFromDatabase(filename: string) {
  try {
    const deletedFile = await db.files.delete({
      where: { name: filename },
    });

    revalidateTag("files");

    return { success: true, deletedFile };
  } catch (error) {
    return {
      success: false,
      error: (error instanceof Error && error.message) || unknownError,
    };
  }
}
