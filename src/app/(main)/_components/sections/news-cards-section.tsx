import { NoNewsPlaceholder } from "@/components/no-news-placeholder";
import { NewsCardsCarousel } from "../carousel/news-cards-carousel";
import { getFutureNews } from "@/lib/actions/news";

export async function NewsCardsSection() {
  const news = await getFutureNews({ take: 6 });

  return (
    <>
      {news.length ? <NewsCardsCarousel news={news} /> : <NoNewsPlaceholder />}
    </>
  );
}
