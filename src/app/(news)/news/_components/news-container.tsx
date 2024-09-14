import { fetchNews } from "@/lib/actions";
import ErrorBoundary from "@/components/error-boundary";

import { NewsFeed } from "./news-feed";
import { ErrorContainer } from '@/components/error-container'

export async function NewsContainer() {
  const initialNews = await fetchNews();

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
