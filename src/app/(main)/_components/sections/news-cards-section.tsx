import { getNewsByParams } from "@/lib/actions/news";
import { NoItemsPlaceholder } from "@/components/no-items-plaiceholder";

import { NewsCardsCarousel } from "../carousel/news-cards-carousel";

export async function NewsCardsSection() {
  const news = await getNewsByParams({
    pageNumber: 1,
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
