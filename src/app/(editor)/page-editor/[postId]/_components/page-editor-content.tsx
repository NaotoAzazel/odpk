import { notFound } from "next/navigation";

import { getPageById } from "@/lib/actions/pages";

import { PageEditor } from "./page-editor";

interface PageEditorContentProps {
  pagePromise: ReturnType<typeof getPageById>;
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
