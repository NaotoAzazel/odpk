import { db } from "@/lib/db";
import { Post } from "@/types";

export async function getFutureNews(): Promise<Post[]> {
  const news = await db.post.findMany({
    take: 6,
    orderBy: {
      "createdAt": "desc"
    }
  });

  return news;
}

export async function getNewsById(postId: number): 
  Promise<Post | null> {
  const news = await db.post.findFirst({
    where: {
      id: postId
    }
  });

  return news;
}