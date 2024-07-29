import { db } from "@/lib/db";
import { Post } from "@/types";
import { Prisma } from "@prisma/client";

export async function getNews() {
  const news = db.post.findMany();
  return news;
}

interface getFutureNewsParams {
  take?: number;
}

export async function getFutureNews({ take = 6 }: getFutureNewsParams = {}) {
  const news = await db.post.findMany({
    take,
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return news;
}

interface getNewsExceptOneByIdParams {
  take?: number;
  id: number;
}

export async function getNewsExceptOneById({
  take = 6,
  id,
}: getNewsExceptOneByIdParams) {
  const news = await db.post.findMany({
    take,
    where: {
      published: true,
      id: { not: id },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return news;
}

export async function getNewsById(postId: number): Promise<Post | null> {
  const news = await db.post.findFirst({
    where: {
      id: postId,
    },
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

interface GetNewsByParamsResult {
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
