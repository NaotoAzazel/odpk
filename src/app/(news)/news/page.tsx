import ErrorBoundary from "@/components/error-boundary";
import { Header } from "@/components/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { NewsCardsErrorContainer } from "@/components/news-cards-error-container";
import { NewsLoadingContainer } from "@/components/skeletons/news-loading-container";

import { NewsContainer } from "./_components/news-container";

import { getNewsByParams } from "@/lib/actions/news";
import { newsPageSchema, NewsPageSchema } from "@/lib/validation/pages";

import { Suspense } from "react";

export const metadata = {
  title: "Новини",
};

interface NewsPageProps {
  searchParams: NewsPageSchema;
}

export default function NewsPage({ searchParams }: NewsPageProps) {
  const { page } = newsPageSchema.parse({ page: searchParams.page });

  const newsPromise = getNewsByParams({
    pageNumber: page,
    pageSize: 6,
  });

  return (
    <MaxWidthWrapper>
      <div className="my-7 grid flex-1 gap-2">
        <Header
          heading="Поточні новини"
          text="Нижче відображаються всі новини"
        />

        <ErrorBoundary fallback={<NewsCardsErrorContainer />}>
          <Suspense
            fallback={
              <NewsLoadingContainer
                className="w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                cardsCount={6}
              />
            }
          >
            <NewsContainer newsPromise={newsPromise} pageNumber={page} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </MaxWidthWrapper>
  );
}
