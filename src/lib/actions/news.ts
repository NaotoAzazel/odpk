import { Post, Prisma } from "@prisma/client";

import {
  deleteCacheValue,
  invalidateCache,
  withCache,
} from "@/lib/actions/cache";
import { imageRemove } from "@/lib/actions/image-remove";
import { db } from "@/lib/db";
import { isImageBlock } from "@/lib/editor";
import { createCacheKey } from "@/lib/utils";

export async function getNews() {
  const cacheKey = "posts:all";

  return withCache<Post[]>({
    key: cacheKey,
    action: async () => {
      const news = await db.post.findMany();
      return news;
    },
    options: { skipCacheOnNull: true },
  });
}

interface GetNewsByIdParams {
  postId: number;
}

export async function getNewsById({
  postId,
}: GetNewsByIdParams): Promise<Post | null> {
  const cacheKey = `post:${postId}`;

  return withCache<Post | null>({
    key: cacheKey,
    action: async () => {
      const news = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      return news;
    },
    options: { skipCacheOnNull: true },
  });
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

  const cacheKey = `posts:${pageNumber}:${pageSize}:${JSON.stringify(params)}`;

  return withCache({
    key: cacheKey,
    action: async () => {
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

      const totalRecordsCount = await db.post.count({ where: other.where });
      const totalPages = Math.ceil(totalRecordsCount / pageSize);

      return {
        data: news,
        metadata: {
          totalPages,
          totalRecordsCount,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
        },
      };
    },
    options: { skipCacheOnNull: true },
  });
}

export async function updateNewsByParams(
  params: Prisma.PostUpdateArgs,
): Promise<Post | null> {
  const updatedNews = await db.post.update(params);

  if (updatedNews) {
    const cacheKey = createCacheKey(`post:${updatedNews.id}`);

    await deleteCacheValue(cacheKey);
    await invalidateCache("posts:*");
  }

  return updatedNews;
}

interface deleteNewsItemByIdParams {
  newsItemId: number;
}

export async function deleteNewsItemById({
  newsItemId,
}: deleteNewsItemByIdParams) {
  const deletedNewsItem = await db.post.delete({ where: { id: newsItemId } });

  if (deletedNewsItem) {
    const cacheKey = createCacheKey(`post:${deletedNewsItem.id}`);

    await deleteCacheValue(cacheKey);
    await invalidateCache("posts:*");

    deletedNewsItem.content.blocks.forEach(async (block) => {
      if (isImageBlock(block)) {
        const modifiedURL = block.data.file.url.split("/")[4];
        const { success } = await imageRemove(modifiedURL);

        if (!success) {
          throw `Image with url: ${block.data.file.url} hasn't been deleted from uploadthing`;
        }
      }
    });
  }

  return deletedNewsItem;
}
