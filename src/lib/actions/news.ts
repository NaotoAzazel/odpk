import { env } from "@/env";
import { Post } from "@/types";
import { Prisma } from "@prisma/client";

import { CachedPost } from "@/types/redis";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";

export async function getNews() {
  const news = db.post.findMany();
  return news;
}

export async function getNewsById(
  postId: number,
): Promise<CachedPost | Post | null> {
  const cachedValue: CachedPost | null = await redis.get(
    `post:${postId}:${env.NODE_ENV}`,
  );

  if (cachedValue) {
    return cachedValue;
  }

  const news = await db.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!news) return null;

  await redis.set(`post:${postId}:${env.NODE_ENV}`, JSON.stringify(news), {
    ex: 60, // expire in 60 sec
  });

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
  const {
    take = pageSize,
    skip = (pageNumber - 1) * pageSize,
    ...other
  } = params;

  const news = await db.post.findMany({
    take,
    skip,
    ...other,
  });

  const totalRecordsCount = await db.post.count();
  const totalPages = Math.ceil(totalRecordsCount / pageSize);

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

export async function updateNewsByParams(
  params: Prisma.PostUpdateArgs,
): Promise<Post | null> {
  const updatedNews = await db.post.update(params);

  if (updatedNews) {
    await redis.del(`post:${updatedNews.id}:${env.NODE_ENV}`);
  }

  return updatedNews;
}

export async function deleteNewsByParams(
  params: Prisma.PostDeleteArgs,
): Promise<Post | null> {
  const deletedNews = await db.post.delete(params);

  if (deletedNews) {
    await redis.del(`post:${deletedNews.id}:${env.NODE_ENV}`);
  }

  return deletedNews;
}
