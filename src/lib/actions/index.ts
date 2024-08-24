"use server";

import { getNewsByParams } from "@/lib/actions/news";

interface FetchNewsParams {
  /**
   * @default 6
   */
  pageSize?: number;

  /**
   * @default 1
   */
  page?: number;
}

export async function fetchNews({
  page = 1,
  pageSize = 6,
}: FetchNewsParams = {}) {
  const news = await getNewsByParams({
    pageNumber: page,
    pageSize,
    params: {
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
  });

  return news;
}
