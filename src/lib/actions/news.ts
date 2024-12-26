"use server";

import { Post, Prisma } from "@prisma/client";

import { CACHE_OPTIONS } from "@/config/cache";
import { deleteAndInvalidateCache, withCache } from "@/lib/actions/cache";
import { db } from "@/lib/db";

export async function getNews() {
  return withCache({
    key: "news:all",
    action: async () => await db.post.findMany(),
    options: CACHE_OPTIONS,
  });
}

export async function getNewsItemById(id: number) {
  return withCache({
    key: `newsItem:${id}`,
    action: async () => await db.post.findUnique({ where: { id } }),
    options: CACHE_OPTIONS,
  });
}

interface GetNewsWithPagination {
  /**
   * @default 1
   */
  page?: number;

  /**
   * @default 6
   */
  itemsPerPage?: number;
}

export interface Metadata {
  totalPages: number;
  totalNewsCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetNewsForPaginationResult {
  data: Post[];
  metadata: Metadata;
}

interface GetNewsForPagination extends GetNewsWithPagination {
  title?: string;
  published?: boolean;

  /**
   * @default desc
   */
  sortByCreatedAt?: Prisma.SortOrder;
}

export async function getNewsForPagination({
  page = 1,
  itemsPerPage = 6,
  title,
  published,
  sortByCreatedAt = "desc",
}: GetNewsForPagination): Promise<GetNewsForPaginationResult> {
  const skip = (page - 1) * itemsPerPage;
  const key = `news:${page},${itemsPerPage},${title},${published},${sortByCreatedAt}`;

  try {
    return withCache({
      key,
      action: async () => {
        const whereClause = { published, title };

        const totalNewsCount = await db.post.count({
          where: whereClause,
        });

        const news = await db.post.findMany({
          where: whereClause,
          orderBy: {
            createdAt: sortByCreatedAt,
          },
          take: itemsPerPage,
          skip,
        });

        const totalPages = Math.ceil(totalNewsCount / itemsPerPage);

        return {
          data: news,
          metadata: {
            totalPages,
            totalNewsCount,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        };
      },
      options: CACHE_OPTIONS,
    });
  } catch (error) {
    return {
      data: [],
      metadata: {
        totalPages: 0,
        totalNewsCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

interface GetPublishedNews extends GetNewsWithPagination {}

export async function getPublishedNews({ itemsPerPage = 6 }: GetPublishedNews) {
  return withCache({
    key: `news:published`,
    action: async () => {
      return await db.post.findMany({
        where: {
          published: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: itemsPerPage,
      });
    },
    options: CACHE_OPTIONS,
  });
}

interface GetAnotherNews extends GetNewsWithPagination {
  exceptId: number;
}

export async function getAnotherNews({
  exceptId,
  itemsPerPage = 6,
}: GetAnotherNews) {
  return withCache({
    key: `news:another`,
    action: async () => {
      return await db.post.findMany({
        where: {
          published: true,
          id: { not: exceptId },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: itemsPerPage,
      });
    },
    options: CACHE_OPTIONS,
  });
}

export async function updateNewsById(id: number, data: Partial<Post>) {
  await db.post.update({ where: { id }, data });
  await deleteAndInvalidateCache(`newsItem:${id}`, "news:*");
}

export async function deleteNewsItemById(id: number) {
  await db.post.delete({ where: { id } });
  await deleteAndInvalidateCache(`newsItem:${id}`, "news:*");
}
