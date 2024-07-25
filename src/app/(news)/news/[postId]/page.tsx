import MaxWidthWrapper from "@/components/max-width-wrapper";

import { AnotherNewsCards } from "../_components/another-news-cards";
import { AnotherNewsSectionLoading } from "../_components/loading/another-news-loading";
import { LoadingEditorOutput } from "../_components/loading/editor-output-loading";
import { NewsContent } from "../_components/news-content";
import { NewsHeading } from "../_components/news-heading";

import { getFutureNews, getNewsById } from "@/lib/actions/news";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { NewsHeadingLoading } from "../_components/loading/news-heading-loading";

import ErrorBoundary from "@/components/error-boundary";
import { NewsCardsErrorContainer } from "@/components/news-cards-error-container";
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
      <section className="flex h-full w-full">
        <MaxWidthWrapper className="relative my-6 bg-white p-5 xl:rounded-lg">
          <Suspense fallback={<NewsHeadingLoading />}>
            <NewsHeading postPromise={postPromise} />
          </Suspense>

          <Suspense fallback={<LoadingEditorOutput />}>
            <NewsContent postPromise={postPromise} />
          </Suspense>

          <div className="space-y-5 border-t">
            <div className="mt-5">
              <h2 className="font-heading text-2xl font-semibold tracking-normal text-gray-800 md:text-4xl">
                Інші новини
              </h2>
            </div>

            <ErrorBoundary fallback={<NewsCardsErrorContainer />}>
              <Suspense fallback={<AnotherNewsSectionLoading />}>
                <AnotherNewsCards newsPromise={newsPromise} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
