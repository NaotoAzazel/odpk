"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { EditorContentSkeleton } from "@/widgets/editor";
import { getNewsItemById } from "@/entities/news";
import { ErrorContainer } from "@/shared/ui";

import { NewsEditor } from "./news-editor";

interface NewsEditorPageProps {
  params: {
    newsId: string;
  };
}

export function NewsEditorPage({ params }: NewsEditorPageProps) {
  const {
    data: newsItem,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news", params.newsId],
    queryFn: () => getNewsItemById(Number(params.newsId)),
  });

  if (isLoading) {
    return <EditorContentSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex w-full justify-center py-36">
        <ErrorContainer
          title="Помилка завантаження редактора"
          description="Ми вже працюємо над цією помилкою, спробуйте перзавантажити сторінку"
        />
      </div>
    );
  }

  if (!newsItem) {
    return notFound();
  }

  return <NewsEditor {...newsItem} />;
}
