import { notFound } from "next/navigation";

import { getNewsById } from "@/lib/actions/news";

import { NewsEditor } from "./news-editor";

interface NewsEditorContentProps {
  newsPromise: ReturnType<typeof getNewsById>;
}

export async function NewsEditorContent({
  newsPromise,
}: NewsEditorContentProps) {
  const news = await newsPromise;

  if (!news) {
    return notFound();
  }

  return <NewsEditor newsItem={news} />;
}
