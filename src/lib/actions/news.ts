import { db } from "@/lib/db";
import { Post } from "@/types";

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
