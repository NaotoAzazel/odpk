"use server";

import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { join } from "path";

import { unknownError } from "@/shared/constants";

interface UploadFileToLocalDirectory {
  file: File;
  absoluteFolderPath: string;
  filename: string;
}

export async function uploadFileToLocalDirectory({
  file,
  absoluteFolderPath,
  filename,
}: UploadFileToLocalDirectory) {
  try {
    await mkdir(absoluteFolderPath, { recursive: true });

    const filePath = join(absoluteFolderPath, filename);

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    await writeFile(filePath, fileBuffer);

    return {
      success: true,
      filePath,
    };
  } catch (error) {
    return {
      success: false,
      error: (error instanceof Error && error.message) || unknownError,
    };
  }
}

export async function getFileFromLocalDirectory(
  absoluteFolderPath: string,
  filename: string,
) {
  const filePath = join(absoluteFolderPath, filename);
  return await readFile(filePath);
}

export async function deleteFileFromLocalDirectory(
  absoluteFolderPath: string,
  filename: string,
) {
  const filePath = join(absoluteFolderPath, filename);
  return await unlink(filePath);
}
