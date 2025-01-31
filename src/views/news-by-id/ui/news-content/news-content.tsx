import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

import { EditorOutput } from "@/widgets/editor";
import { getNewsItemById } from "@/entities/news";
import { ErrorContainer, Title } from "@/shared/ui";

import { NewsContentSkeleton } from "./news-content-skeleton";

interface NewsContentProps {
  newsId: number;
}

export function NewsContent({ newsId }: NewsContentProps) {
  const {
    data: newsItem,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news", newsId],
    queryFn: () => getNewsItemById(newsId),
  });

  const { status } = useSession();

  if (status === "loading" || isLoading) {
    return <NewsContentSkeleton />;
  }

  if (isError) {
    return <ErrorContainer title="Помилка завантаження новини" />;
  }

  if (!newsItem || (!newsItem.published && status === "unauthenticated")) {
    return notFound();
  }

  return (
    <>
      <Title heading={newsItem.title} />
      <div id="news-container" className="py-5">
        <EditorOutput content={newsItem.content} />
      </div>
    </>
  );
}
