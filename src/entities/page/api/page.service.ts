"use server";

import { Prisma, StaticPages } from "@prisma/client";



import { CACHE_OPTIONS, db, deleteAndInvalidateCache, withCache } from "@/shared/lib";
import { PaginatedResult, PaginationParams } from "@/shared/model";





export async function getPages() {
  return withCache({
    key: "pages:all",
    action: async () => await db.staticPages.findMany(),
    options: CACHE_OPTIONS,
  });
}

interface GetPagesForPagination extends PaginationParams {
  title?: string;

  /**
   * @default desc
   */
  sortByCreatedAt?: Prisma.SortOrder;
}

export async function getPagesForPagination({
  page = 1,
  itemsPerPage = 6,
  title,
  sortByCreatedAt = "desc",
}: GetPagesForPagination): Promise<PaginatedResult<StaticPages>> {
  const skip = (page - 1) * itemsPerPage;
  const key = `pages:${page},${itemsPerPage},${title},${sortByCreatedAt}`;

  try {
    return withCache({
      key,
      action: async () => {
        const whereClause = {
          title: {
            startsWith: title,
            mode: Prisma.QueryMode.insensitive,
          },
        };

        const totalItems = await db.staticPages.count({
          where: whereClause,
        });

        const pages = await db.staticPages.findMany({
          where: whereClause,
          orderBy: {
            createdAt: sortByCreatedAt,
          },
          take: itemsPerPage,
          skip,
        });

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return {
          data: pages,
          metadata: {
            totalPages,
            totalItems,
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
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

export async function getPageById(id: number) {
  return withCache({
    key: `page:${id}`,
    action: async () => await db.staticPages.findUnique({ where: { id } }),
    options: CACHE_OPTIONS,
  });
}

export async function getPageByHref(href: string) {
  return withCache({
    key: `page:${href}`,
    action: async () => await db.staticPages.findUnique({ where: { href } }),
    options: CACHE_OPTIONS,
  });
}

export async function getPageByTitle(title: string) {
  return withCache({
    key: `page:${title}`,
    action: async () => await db.staticPages.findUnique({ where: { title } }),
    options: CACHE_OPTIONS,
  });
}

export async function updatePageById(id: number, data: Partial<StaticPages>) {
  await db.staticPages.update({ where: { id }, data });
  await deleteAndInvalidateCache(`page:${id}`, "pages:*");
}

export async function deletePageById(id: number) {
  await db.staticPages.delete({ where: { id } });
  await deleteAndInvalidateCache(`page:${id}`, "pages:*");
}