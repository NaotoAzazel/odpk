import { EditorContent } from "./_components/editor-content";
import { EditorContentSkeleton } from "./_components/editor-content-skeleton";

import { getNewsById } from "@/lib/actions/news";

import { Suspense } from "react";

interface EditorPageProps {
  params: {
    postId: string;
  };
}

export default function EditorPage({ params }: EditorPageProps) {
  const postPromise = getNewsById(parseInt(params.postId));

  return (
    <Suspense fallback={<EditorContentSkeleton />}>
      <EditorContent postPromise={postPromise} />
    </Suspense>
  );
}
