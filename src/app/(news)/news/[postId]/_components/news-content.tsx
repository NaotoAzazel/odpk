import { lazy } from "react";
import { notFound } from "next/navigation";

import { getNewsItemById } from "@/lib/actions/news";

const EditorOutput = lazy(() =>
  import("@/components/editor/editor-output").then((module) => {
    return { default: module.EditorOutput };
  }),
);

interface NewsContentProps {
  postPromise: ReturnType<typeof getNewsItemById>;
}

export async function NewsContent({ postPromise }: NewsContentProps) {
  const post = await postPromise;

  if (!post) {
    return notFound();
  }

  return (
    <div id="news-container" className="py-5">
      <EditorOutput content={post.content} className="flex" />
    </div>
  );
}
