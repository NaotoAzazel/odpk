import { getFutureNews } from "@/lib/actions/news";
import { CropNewsCard } from "@/components/cards/crop-news-card";
import { CardsHolder } from "@/components/layouts/cards-holder";

interface AnotherNewsCardsProps {
  newsPromise: ReturnType<typeof getFutureNews>;
}

export async function AnotherNewsCards({ newsPromise }: AnotherNewsCardsProps) {
  const news = await newsPromise;

  return (
    <CardsHolder className="grid-cols-1 lg:grid-cols-3">
      {news.map((item, i) => (
        <CropNewsCard post={item} key={i} />
      ))}
    </CardsHolder>
  );
}
