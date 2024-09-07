import { notFound } from "next/navigation";

import { getPageByParams } from "@/lib/actions/pages";

import { PageEditor } from "./page-editor";

interface PageEditorContentProps {
  pagePromise: ReturnType<typeof getPageByParams>;
}

export async function PageEditorContent({
  pagePromise,
}: PageEditorContentProps) {
  const page = await pagePromise;

  if (!page) {
    return notFound();
  }

  return <PageEditor page={page} />;
}
