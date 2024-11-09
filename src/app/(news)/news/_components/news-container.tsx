import { getNewsByParams } from "@/lib/actions/news";
import ErrorBoundary from "@/components/error-boundary";
import { ErrorContainer } from "@/components/error-container";

import { NewsFeed } from "./news-feed";

export async function NewsContainer() {
  const initialNews = await getNewsByParams({
    pageSize: 6,
    params: {
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
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
