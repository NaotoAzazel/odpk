import { fetchNews } from "@/lib/actions";
import ErrorBoundary from "@/components/error-boundary";
import { NewsCardsErrorContainer } from "@/components/news-cards-error-container";

import { NewsFeed } from "./news-feed";

export async function NewsContainer() {
  const initialNews = await fetchNews();

  return (
    <ErrorBoundary fallback={<NewsCardsErrorContainer />}>
      <NewsFeed initialNews={initialNews} />
    </ErrorBoundary>
  );
}
