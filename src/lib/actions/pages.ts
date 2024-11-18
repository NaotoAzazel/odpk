import { Prisma } from "@prisma/client";

import {
  deleteCacheValue,
  invalidateCache,
  withCache,
} from "@/lib/actions/cache";
import { db } from "@/lib/db";
import { createCacheKey } from "@/lib/utils";

interface GetPageDataByParamsParams {
  params?: Prisma.StaticPagesFindManyArgs;
}

export async function getPagesByParams({
  params,
}: GetPageDataByParamsParams = {}) {
  const key = `pages:${JSON.stringify(params)}`;

  return withCache({
    key,
    action: async () => {
      const pages = await db.staticPages.findMany(params);
      return pages;
    },
    options: { skipCacheOnNull: true },
  });
}

interface GetPageByParamsParams {
  params?: Prisma.StaticPagesFindFirstArgs;
}

export async function getPageById(pageId: number) {
  return withCache({
    key: `page:${pageId}`,
    action: async () => {
      const page = await db.staticPages.findUnique({ where: { id: pageId } });
      return page;
    },
    options: { skipCacheOnNull: true },
  });
}

export async function getPageByParams({ params }: GetPageByParamsParams = {}) {
  return withCache({
    key: `page:${JSON.stringify(params)}`,
    action: async () => {
      const page = await db.staticPages.findFirst(params);
      return page;
    },
    options: { skipCacheOnNull: true },
  });
}

interface UpdatePageByParamsParams {
  params: Prisma.StaticPagesUpdateArgs;
}

export async function updatePageByParams({ params }: UpdatePageByParamsParams) {
  const updatedPage = await db.staticPages.update(params);

  if (updatedPage) {
    const cacheKey = createCacheKey(`page:${updatedPage.content.time}`);

    await deleteCacheValue(cacheKey);
    await invalidateCache("pages:*");
  }

  return updatedPage;
}

export async function deletePageByParams(params: Prisma.StaticPagesDeleteArgs) {
  const deletedPage = await db.staticPages.delete(params);

  if (deletedPage) {
    const cacheKey = createCacheKey(`page:${deletedPage.content.time}`);

    await deleteCacheValue(cacheKey);
    await invalidateCache("pages:*");
  }

  return deletedPage;
}
