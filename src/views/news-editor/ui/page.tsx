import { Suspense } from "react";

import { EditorContentSkeleton } from "@/widgets/editor";
import { getNewsItemById } from "@/entities/news";

import { NewsEditorContent } from "./editor";

interface NewsEditorPageProps {
  params: {
    newsId: string;
  };
}

export function NewsEditorPage({ params }: NewsEditorPageProps) {
  const newsPromise = getNewsItemById(Number(params.newsId));

  return (
    <Suspense fallback={<EditorContentSkeleton />}>
      <NewsEditorContent newsPromise={newsPromise} />
    </Suspense>
  );
}
