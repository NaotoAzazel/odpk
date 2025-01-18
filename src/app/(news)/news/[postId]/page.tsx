import { cache } from "react";
import { NewsPageById } from "@/views/news-by-id";
import { getServerSession } from "next-auth";
import { Metadata } from "next";

import { authOptions } from "@/features/auth";
import { getNewsItemById } from "@/entities/news";
import { REDIRECTS } from "@/shared/constants";
import { toAbsoluteUrl } from "@/shared/lib";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface NewsPageProps {
  params: {
    postId: string;
  };
}

const getCachedUserSession = cache(async () => {
  return await getServerSession(authOptions);
});

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const news = await getNewsItemById(Number(params.postId));
  const user = await getCachedUserSession();

  if (!news || (!news.published && !user?.user)) {
    return {};
  }

  const ogUrl = new URL(toAbsoluteUrl("/api/og"));
  ogUrl.searchParams.set("heading", news.title);
  ogUrl.searchParams.set("type", "Новина");

  return {
    title: news.title,
    openGraph: {
      title: news.title,
      type: "article",
      url: toAbsoluteUrl(`${REDIRECTS.toNewsItem}/${news.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({ params }: NewsPageProps) {
  return <NewsPageById params={params} />;
}
