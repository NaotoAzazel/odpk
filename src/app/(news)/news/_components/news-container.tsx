import { paginationConfig } from "@/config/pagination";
import { getNewsForPagination } from "@/lib/actions/news";
import ErrorBoundary from "@/components/error-boundary";
import { ErrorContainer } from "@/components/error-container";

import { NewsFeed } from "./news-feed";

export async function NewsContainer() {
  const initialNews = await getNewsForPagination({
    itemsPerPage: paginationConfig.newsPage.newsPerPage,
  });

  return (
    <ErrorBoundary
      fallback={
        <ErrorContainer
          title="Виникла помилка з отримання новин"
          description="Ми вже працює над виправленням цієї помилки"
        />
      }
    >
      <NewsFeed initialNews={initialNews} />
    </ErrorBoundary>
  );
}
