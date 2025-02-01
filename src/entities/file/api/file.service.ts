"use server";

import { FileTypes } from "@prisma/client";

import { unknownError } from "@/shared/constants";
import { db } from "@/shared/lib";

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

    return { success: true, deletedFile };
  } catch (error) {
    return {
      success: false,
      error: (error instanceof Error && error.message) || unknownError,
    };
  }
}
