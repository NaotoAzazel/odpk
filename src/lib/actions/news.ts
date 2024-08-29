import { Post } from "@/types";
import { Prisma } from "@prisma/client";

import { CachedPost } from "@/types/redis";
import { getCachedValue, setCachedValue } from "@/lib/actions/cache";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { createCacheKey } from "@/lib/utils";

// TODO: create callback func "withCache"
// that receives cache key, actions and caches the data
export async function getNews() {
  const cacheKey = "allPosts";
  const cachedValue = await getCachedValue<CachedPost[] | null>("allPosts");

  if (cachedValue) {
    return cachedValue;
  }

  const news = await db.post.findMany();

  if (!news) return [];

  await setCachedValue(cacheKey, JSON.stringify(news), 120);

  return news;
}

interface GetNewsByIdParams {
  postId: number;
}

export async function getNewsById({
  postId,
}: GetNewsByIdParams): Promise<Post | null> {
  const cacheKey = `post:${postId}`;
  const cachedValue = await getCachedValue<CachedPost | null>(cacheKey);

  if (cachedValue) {
    return cachedValue;
  }

  const news = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!news) return null;

  await setCachedValue(cacheKey, JSON.stringify(news), 120);

  return news;
}

interface GetNewsByParamsParams {
  params?: Prisma.PostFindManyArgs;

  /**
   * @default 1
   */
  pageNumber?: number;

  /**
   * @default 8
   */
  pageSize?: number;
}

export interface Metadata {
  totalPages: number;
  totalRecordsCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetNewsByParamsResult {
  data: Post[];
  metadata: Metadata;
}

export async function getNewsByParams({
  params = {},
  pageNumber = 1,
  pageSize = 8,
}: GetNewsByParamsParams = {}): Promise<GetNewsByParamsResult> {
  const countTotalPages = (totalRecordsCount: number, pageSize: number) =>
    Math.ceil(totalRecordsCount / pageSize);

  const {
    take = pageSize,
    skip = (pageNumber - 1) * pageSize,
    ...other
  } = params;

  const cacheKey = `posts:${pageNumber}:${pageSize}:${JSON.stringify(params)}`;
  const cachedValue = await getCachedValue<CachedPost[] | null>(cacheKey);
  if (cachedValue) {
    const totalPages = countTotalPages(cachedValue.length, pageSize);
    const totalRecordsCount = await db.post.count({ where: other.where });

    return {
      data: cachedValue,
      metadata: {
        totalPages,
        totalRecordsCount,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1,
      },
    };
  }

  const news = await db.post.findMany({
    take,
    skip,
    ...other,
  });

  if (!news) {
    return {
      data: [],
      metadata: {
        totalPages: 0,
        totalRecordsCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  await setCachedValue(cacheKey, JSON.stringify(news), 120);

  const totalRecordsCount = await db.post.count({ where: other.where });
  const totalPages = countTotalPages(totalRecordsCount, pageSize);

  const hasNextPage = pageNumber < totalPages;
  const hasPrevPage = pageNumber > 1;

  return {
    data: news,
    metadata: {
      totalPages,
      totalRecordsCount,
      hasNextPage,
      hasPrevPage,
    },
  };
}

// TODO: add revalidation of all cached post
// when update or delete one
export async function updateNewsByParams(
  params: Prisma.PostUpdateArgs,
): Promise<Post | null> {
  const updatedNews = await db.post.update(params);

  if (updatedNews) {
    await redis.del(createCacheKey(`post:${updatedNews.id}`));
  }

  return updatedNews;
}

export async function deleteNewsByParams(
  params: Prisma.PostDeleteArgs,
): Promise<Post | null> {
  const deletedNews = await db.post.delete(params);

  if (deletedNews) {
    await redis.del(createCacheKey(`post:${deletedNews.id}`));
  }

  return deletedNews;
}
