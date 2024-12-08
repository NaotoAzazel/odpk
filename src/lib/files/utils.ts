import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { join } from "path";
import { FileTypes } from "@prisma/client";

import { unknownError } from "@/config/constants";

export function generateUniqueFilename(file: File) {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${uniqueSuffix}_${file.name}`;
}

export function getFileType(file: File): FileTypes {
  return file.type.startsWith("image/") ? "IMAGE" : "DOCUMENT";
}

interface UploadFileToLocalDirectoryParams {
  file: File;
  absoluteFolderPath: string;
  filename: string;
}

export async function uploadFileToLocalDirectory({
  file,
  absoluteFolderPath,
  filename,
}: UploadFileToLocalDirectoryParams) {
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
    console.error("Error saving file:", error);
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
