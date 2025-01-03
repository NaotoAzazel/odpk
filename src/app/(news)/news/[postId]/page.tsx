import { cache, Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { redirects } from "@/config/constants";
import { paginationConfig } from "@/config/pagination";
import { getAnotherNews, getNewsItemById } from "@/lib/actions/news";
import { authOptions } from "@/lib/auth";
import { absoluteUrl } from "@/lib/utils";
import { LoadingEditorOutput } from "@/components/editor/editor-output-loading";
import ErrorBoundary from "@/components/error-boundary";
import { ErrorContainer } from "@/components/error-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";

import { AnotherNewsCards } from "./_components/another-news-cards";
import { NewsContent } from "./_components/news-content";
import { NewsHeading } from "./_components/news-heading";
import { AnotherNewsSectionSkeleton } from "./_components/skeletons/another-news-skeletons";
import { NewsHeadingSkeleton } from "./_components/skeletons/news-heading-skeletons";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface NewsPageProps {
  params: {
    postId: string;
  };
}

const getCachedUserSession = cache(async () => {
  return await getServerSession(authOptions);
});

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const news = await getNewsItemById(Number(params.postId));
  const user = await getCachedUserSession();

  if (!news || (!news.published && !user?.user)) {
    return {};
  }

  const ogUrl = new URL(absoluteUrl("/api/og"));
  ogUrl.searchParams.set("heading", news.title);
  ogUrl.searchParams.set("type", "Новина");

  return {
    title: news.title,
    openGraph: {
      title: news.title,
      type: "article",
      url: absoluteUrl(`${redirects.toNewsItem}/${news.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      images: [ogUrl.toString()],
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const postPromise = getNewsItemById(Number(params.postId));
  const anotherNewsPromise = getAnotherNews({
    exceptId: Number(params.postId),
    itemsPerPage: paginationConfig.newsItemPage.anotherNewsAmount,
  });

  const user = await getCachedUserSession();

  const currentNews = await postPromise;
  if (!currentNews || (!currentNews.published && !user?.user)) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="flex h-full w-full">
        <MaxWidthWrapper className="relative my-6 bg-white p-5 xl:rounded-lg">
          <Suspense fallback={<NewsHeadingSkeleton />}>
            <NewsHeading postPromise={postPromise} />
          </Suspense>

          <Suspense fallback={<LoadingEditorOutput />}>
            <NewsContent postPromise={postPromise} />
          </Suspense>

          <div className="space-y-5 border-t">
            <div className="mt-5">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-gray-800 md:text-4xl">
                Інші новини
              </h2>
            </div>

            <ErrorBoundary
              fallback={
                <ErrorContainer
                  title="Виникла помилка з отримання новин"
                  description="Ми вже працює над виправленням цієї помилки"
                />
              }
            >
              <Suspense fallback={<AnotherNewsSectionSkeleton />}>
                <AnotherNewsCards newsPromise={anotherNewsPromise} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
