import { Suspense } from "react";

import { getNewsById } from "@/lib/actions/news";

import { EditorContentSkeleton } from "../../_components/editor-content-skeleton";
import { NewsEditorContent } from "./_components/news-editor-content";

interface NewsEditorPageProps {
  params: {
    newsId: string;
  };
}

export const metadata = {
  title: "Редактор",
};

export default function NewsEditorPage({ params }: NewsEditorPageProps) {
  const newsPromise = getNewsById({ postId: Number(params.newsId) });

  return (
    <Suspense fallback={<EditorContentSkeleton />}>
      <NewsEditorContent newsPromise={newsPromise} />
    </Suspense>
  );
}
