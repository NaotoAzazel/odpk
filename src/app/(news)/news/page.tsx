import { Suspense } from "react";

import ErrorBoundary from "@/components/error-boundary";
import { Header } from "@/components/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { NewsLoadingContainer } from "@/components/skeletons/news-loading-container";

import { NewsContainer } from "./_components/news-container";
import { ErrorContainer } from '@/components/error-container'

export const metadata = {
  title: "Новини",
};

export default function NewsPage() {
  return (
    <MaxWidthWrapper>
      <div className="my-7 grid flex-1 gap-2">
        <Header
          heading="Поточні новини"
          text="Нижче відображаються всі новини"
        />
        <ErrorBoundary
          fallback={
            <ErrorContainer
              title="Виникла помилка з отримання новин"
              description="Ми вже працює над виправленням цієї помилки"
            />
          }
        >
          <Suspense
            fallback={
              <NewsLoadingContainer
                className="w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                cardsCount={6}
              />
            }
          >
            <NewsContainer />
          </Suspense>
        </ErrorBoundary>
      </div>
    </MaxWidthWrapper>
  );
}
