import { getNewsById } from "@/lib/actions/news";
const EditorOutput = lazy(() =>
  import("./editor-output").then((module) => {
    return { default: module.EditorOutput };
  })
);

import { notFound } from "next/navigation";
import { lazy } from "react";

interface NewsContentProps {
  postPromise: ReturnType<typeof getNewsById>;
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
