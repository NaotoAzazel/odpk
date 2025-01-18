import { NewsFeed } from "@/widgets/news-feed";
import { getNewsForPagination, NEWS_PER_PAGE } from "@/entities/news";
import { ErrorBoundary, ErrorContainer } from "@/shared/ui";

export async function NewsContainer() {
  const initialNews = await getNewsForPagination({
    itemsPerPage: NEWS_PER_PAGE,
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
