import { Suspense } from "react";

import { NewsContainer } from "@/widgets/news-container";
import {
  ErrorBoundary,
  ErrorContainer,
  MaxWidthWrapper,
  NewsLoadingContainer,
  Title,
} from "@/shared/ui";

export function NewsPage() {
  return (
    <MaxWidthWrapper>
      <div className="my-7 grid flex-1 gap-2">
        <Title
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
