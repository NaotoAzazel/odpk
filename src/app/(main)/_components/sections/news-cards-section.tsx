import { getNewsByParams } from "@/lib/actions/news";
import { NoItemsPlaceholder } from "@/components/no-items-plaiceholder";

import { NewsCardsCarousel } from "../carousel/news-cards-carousel";
import { paginationConfig } from '@/config/pagination'

export async function NewsCardsSection() {
  const news = await getNewsByParams({
    pageNumber: 1,
    pageSize: paginationConfig.mainPage.newsCardsAmount,
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
    <>
      {news.data.length ? (
        <NewsCardsCarousel news={news.data} title="Новини" />
      ) : (
        <NoItemsPlaceholder
          title="Не вдалось знайти новини"
          description="Спробуйте змінити фільтри, або перевірте пізніше"
        />
      )}
    </>
  );
}
