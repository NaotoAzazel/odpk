import MaxWidthWrapper from "@/components/max-width-wrapper";

import { LoadingEditorOutput } from "../_components/loading/editor-output-loading";
import { AnotherNewsSectionLoading } from "../_components/loading/another-news-loading";
import { AnotherNewsCards } from "../_components/another-news-cards";
import { NewsContent } from "../_components/news-content";
import { NewsHeading } from "../_components/news-heading";

import { getFutureNews, getNewsById } from "@/lib/actions/news";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { NewsHeadingLoading } from "../_components/loading/news-heading-loading";

import { getServerSession } from "next-auth";

interface NewsPageProps {
  params: {
    postId: string;
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const postPromise = getNewsById(parseInt(params.postId));
  const newsPromise = getFutureNews({ take: 3 });

  const user = await getServerSession();

  const currentNews = await postPromise;
  if (!currentNews || (!currentNews.published && !user?.user)) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="flex w-full h-full">
        <MaxWidthWrapper className="bg-white p-5 my-6 xl:rounded-lg relative">
          <Suspense fallback={<NewsHeadingLoading />}>
            <NewsHeading postPromise={postPromise} />
          </Suspense>

          <Suspense fallback={<LoadingEditorOutput />}>
            <NewsContent postPromise={postPromise} />
          </Suspense>

          <div className="border-t space-y-5">
            <div className="mt-5">
              <h2 className="font-heading font-semibold tracking-normal text-2xl md:text-4xl text-gray-800">
                Інші новини
              </h2>
            </div>
            <Suspense fallback={<AnotherNewsSectionLoading />}>
              <AnotherNewsCards newsPromise={newsPromise} />
            </Suspense>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
