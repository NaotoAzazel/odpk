import MaxWidthWrapper from "@/components/max-width-wrapper";
import { EditorOutput } from "../_components/editor-output";
import LoadingPage from "../_components/loading";

import { getNewsById } from "@/lib/actions/news";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layouts/page-header";

import { Suspense } from "react";

interface NewsPageProps {
  params: {
    postId: string;
  };
};

export default async function NewsPage({ params }: NewsPageProps) {
  const post = await getNewsById(parseInt(params.postId));

  if(!post) {
    return notFound();
  }

  return (
    <MaxWidthWrapper id="news-container" className="py-6">
      <Suspense fallback={<LoadingPage />}>
        <PageHeader heading={post.title} />
        <EditorOutput 
          content={post.content} 
          className="mt-6 flex"
        />
      </Suspense>
    </MaxWidthWrapper>
  );
}