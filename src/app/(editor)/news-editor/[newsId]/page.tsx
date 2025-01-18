import { NewsEditorPage } from "@/views/news-editor";

interface NewsEditorPageProps {
  params: {
    newsId: string;
  };
}

export const metadata = {
  title: "Редактор",
};

export default function Page({ params }: NewsEditorPageProps) {
  return <NewsEditorPage params={params} />;
}
