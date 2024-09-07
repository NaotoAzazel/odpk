import { Suspense } from "react";

import { getPageByParams } from "@/lib/actions/pages";

import { EditorContentSkeleton } from "../../editor/[postId]/_components/editor-content-skeleton";
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
  const pagePromise = getPageByParams({
    params: { where: { id: Number(params.postId) } },
  });

  return (
    <Suspense fallback={<EditorContentSkeleton />}>
      <PageEditorContent pagePromise={pagePromise} />
    </Suspense>
  );
}
