import { cache, Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { getNewsById, getNewsByParams } from "@/lib/actions/news";
import { authOptions } from "@/lib/auth";
import { absoluteUrl } from "@/lib/utils";
import ErrorBoundary from "@/components/error-boundary";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { NewsCardsErrorContainer } from "@/components/news-cards-error-container";

import { AnotherNewsCards } from "./_components/another-news-cards";
import { AnotherNewsSectionLoading } from "./_components/loading/another-news-loading";
import { LoadingEditorOutput } from "./_components/loading/editor-output-loading";
import { NewsHeadingLoading } from "./_components/loading/news-heading-loading";
import { NewsContent } from "./_components/news-content";
import { NewsHeading } from "./_components/news-heading";

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
  const news = await getNewsById(parseInt(params.postId));
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
      url: absoluteUrl(`/news/${news.id}`),
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
  const postPromise = getNewsById(parseInt(params.postId));
  const anotherNewsPromise = getNewsByParams({
    pageNumber: 1,
    pageSize: 3,
    params: {
      where: {
        published: true,
        id: { not: parseInt(params.postId) },
      },
      orderBy: {
        createdAt: "desc",
      },
    },
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
                <AnotherNewsCards newsPromise={anotherNewsPromise} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
