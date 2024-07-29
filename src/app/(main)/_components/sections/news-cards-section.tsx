import { NoNewsPlaceholder } from "@/components/no-news-placeholder";
import { getNewsByParams } from "@/lib/actions/news";
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
        <NewsCardsCarousel news={news.data} />
      ) : (
        <NoNewsPlaceholder />
      )}
    </>
  );
}
