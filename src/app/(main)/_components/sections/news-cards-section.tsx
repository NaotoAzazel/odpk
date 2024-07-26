import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { getFutureNews } from "@/lib/actions/news";
import { NewsCardsCarousel } from "../carousel/news-cards-carousel";

export async function NewsCardsSection() {
  const news = await getFutureNews({ take: 6 });

  return (
    <>
      {news.length ? (
        <NewsCardsCarousel news={news} />
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
