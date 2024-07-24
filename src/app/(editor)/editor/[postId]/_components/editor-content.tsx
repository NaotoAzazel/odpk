import { Editor } from "../../../_components/editor";
import { getNewsById } from "@/lib/actions/news";
import { notFound } from "next/navigation";

interface EditorContentProps {
  postPromise: ReturnType<typeof getNewsById>;
}

export async function EditorContent({ postPromise }: EditorContentProps) {
  const post = await postPromise;

  if (!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4 my-10">
      <Editor post={post} />
    </div>
  );
}
