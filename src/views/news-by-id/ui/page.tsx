import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { EditorOutputSkeleton } from "@/widgets/editor";
import { authOptions } from "@/features/auth";
import { getAnotherNews, getNewsItemById } from "@/entities/news";
import { ErrorBoundary, ErrorContainer, MaxWidthWrapper } from "@/shared/ui";

import { ANOTHER_NEWS_AMOUNT } from "../constants";
import {
  AnotherNewsCards,
  AnotherNewsCardsSkeleton,
} from "./another-news-cards-holder";
import { NewsHeading, NewsHeadingSkeleton } from "./heading";
import { NewsContent } from "./news-content";

interface NewsPageProps {
  params: {
    postId: string;
  };
}

export async function NewsPageById({ params }: NewsPageProps) {
  const postPromise = getNewsItemById(Number(params.postId));
  const anotherNewsPromise = getAnotherNews({
    exceptId: Number(params.postId),
    itemsPerPage: ANOTHER_NEWS_AMOUNT,
  });

  const user = await getServerSession(authOptions);

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

          <Suspense fallback={<EditorOutputSkeleton />}>
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
              <Suspense fallback={<AnotherNewsCardsSkeleton />}>
                <AnotherNewsCards newsPromise={anotherNewsPromise} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
