"use server";

import { Files, FileTypes, Prisma } from "@prisma/client";

import { unknownError } from "@/shared/constants";
import { db } from "@/shared/lib";
import { PaginatedResult, PaginationParams } from "@/shared/model";

export async function getFiles() {
  const files = await db.files.findMany();
  return files;
}

interface GetFilesForPagination extends PaginationParams {
  title?: string;

  /**
   * @default desc
   */
  sortByCreatedAt?: Prisma.SortOrder;
}

export async function getFilesForPagination({
  page = 1,
  itemsPerPage = 6,
  title,
  sortByCreatedAt = "desc",
}: GetFilesForPagination): Promise<PaginatedResult<Files>> {
  const skip = (page - 1) * itemsPerPage;

  try {
    const whereClause = {
      name: {
        startsWith: title,
        mode: Prisma.QueryMode.insensitive,
      },
    };

    const totalItems = await db.files.count({
      where: whereClause,
    });

    const files = await db.files.findMany({
      where: whereClause,
      orderBy: {
        createdAt: sortByCreatedAt,
      },
      take: itemsPerPage,
      skip,
    });

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      data: files,
      metadata: {
        totalPages,
        totalItems,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    return {
      data: [],
      metadata: {
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
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
