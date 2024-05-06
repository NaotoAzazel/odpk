import { Editor } from "../../_components/editor";
import { getNewsById } from "@/lib/actions/news";

import { notFound } from "next/navigation";

interface EditorPageProps {
  params: {
    postId: string;
  };
};

export default async function EditorPage({ params }: EditorPageProps) {
  const post = await getNewsById(parseInt(params.postId));

  if(!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center gap-6 my-10">
      <Editor post={post} />
    </div>
  )
}