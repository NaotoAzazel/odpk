import { getPublishedNews } from "@/entities/news";
import { NoItemsPlaceholder } from "@/shared/ui/placeholder";

import { ITEMS_IN_NEWS_CAROUSEL } from "../../constants";
import { NewsCardsCarousel } from "../carousels";

export async function NewsCardsSection() {
  const latestPublishedNews = await getPublishedNews({
    itemsPerPage: ITEMS_IN_NEWS_CAROUSEL,
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
