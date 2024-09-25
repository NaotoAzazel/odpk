import { Suspense } from "react";

import { getPageById } from "@/lib/actions/pages";

import { EditorContentSkeleton } from "../../_components/editor-content-skeleton";
import { PageEditorContent } from "./_components/page-editor-content";

interface EditorPageProps {
  params: {
    postId: string;
  };
}

export const metadata = {
  title: "Редактор",
};

export default function EditorPage({ params }: EditorPageProps) {
  const pagePromise = getPageById(Number(params.postId));

  return (
    <Suspense fallback={<EditorContentSkeleton />}>
      <PageEditorContent pagePromise={pagePromise} />
    </Suspense>
  );
}
