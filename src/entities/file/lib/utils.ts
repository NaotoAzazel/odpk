"use server";

import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { join } from "path";

import { absoluteUploadsDirection } from "@/widgets/file-uploader";
import { unknownError } from "@/shared/constants";

export async function getFormattedFolderPath(absoluteFolderPath: string) {
  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth().toString();

  return join(absoluteFolderPath, year, month);
}

async function createFolderIfNotExists(uploadsDirection: string) {
  const formattedFilePath = await getFormattedFolderPath(uploadsDirection);
  await mkdir(formattedFilePath, { recursive: true });
}

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
    await createFolderIfNotExists(absoluteUploadsDirection);

    const formattedFolderPath =
      await getFormattedFolderPath(absoluteFolderPath);

    const filePath = join(formattedFolderPath, filename);

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
