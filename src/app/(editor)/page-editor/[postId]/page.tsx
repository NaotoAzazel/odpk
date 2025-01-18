import { EditorPage } from "@/views/page-editor";

interface EditorPageProps {
  params: {
    postId: string;
  };
}

export const metadata = {
  title: "Редактор",
};

export default function Page({ params }: EditorPageProps) {
  return <EditorPage params={params} />;
}
