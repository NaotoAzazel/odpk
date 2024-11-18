import { EditorOutput } from "@/components/editor/editor-output";

interface PageContentProps {
  pageContent: PrismaJson.Content;
}

export function PageContent({ pageContent }: PageContentProps) {
  return (
    <div id="page-container" className="py-5">
      <EditorOutput content={pageContent} className="flex" />
    </div>
  );
}
