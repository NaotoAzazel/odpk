import { paginationConfig } from "@/config/pagination";
import { getPublishedNews } from "@/lib/actions/news";
import { NoItemsPlaceholder } from "@/components/no-items-plaiceholder";

import { NewsCardsCarousel } from "../carousel/news-cards-carousel";

export async function NewsCardsSection() {
  const latestPublishedNews = await getPublishedNews({
    itemsPerPage: paginationConfig.mainPage.newsCardsAmount,
  });

  return (
    <>
      {latestPublishedNews.length ? (
        <NewsCardsCarousel news={latestPublishedNews} title="Новини" />
      ) : (
        <NoItemsPlaceholder
          title="Не вдалось знайти новини"
          description="Спробуйте змінити фільтри, або перевірте пізніше"
        />
      )}
    </>
  );
}
