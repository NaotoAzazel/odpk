import { db } from "@/lib/db";
import { Post } from "@/types";

export async function getFutureNews(): Promise<Post[]> {
  const news = await db.post.findMany({
    take: 6,
    orderBy: {
      "createdAt": "desc"
    }
  });

  const typedNews = news.map((item) => ({ 
    ...item, 
    images: item.images as { id: string }[] 
  }));
  
  return typedNews;
}