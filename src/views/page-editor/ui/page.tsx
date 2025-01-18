import { Suspense } from "react";

import { EditorContentSkeleton } from "@/widgets/editor";
import { getPageById } from "@/entities/page";

import { PageEditorContent } from "./editor";

interface EditorPageProps {
  params: {
    postId: string;
  };
}

export function EditorPage({ params }: EditorPageProps) {
  const pagePromise = getPageById(Number(params.postId));

  return (
    <Suspense fallback={<EditorContentSkeleton />}>
      <PageEditorContent pagePromise={pagePromise} />
    </Suspense>
  );
}
