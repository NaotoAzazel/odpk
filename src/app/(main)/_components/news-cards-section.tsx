import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { getFutureNews } from "@/lib/actions/news";
import { NewsCardsSwiper } from "./swiper/news-cards-swiper";

export async function NewsCardsSection() {
  const news = await getFutureNews({ take: 3 });

  return (
    <>
      {news.length ? (
        <div>
          <NewsCardsSwiper news={news} />
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>
            Не вдалось знайти новини
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            На даний момент не додано жодної новини
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </>
  );
}
