import { CropNewsCard } from "@/components/cards/crop-news-card";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { CardsHolder } from "@/components/layouts/cards-holder";
import { getNewsExceptOneById } from "@/lib/actions/news";

interface AnotherNewsCardsProps {
  newsPromise: ReturnType<typeof getNewsExceptOneById>;
}

export async function AnotherNewsCards({ newsPromise }: AnotherNewsCardsProps) {
  const news = await newsPromise;

  return (
    <>
      {news.length ? (
        <CardsHolder className="grid-cols-1 lg:grid-cols-3">
          {news.map((item, i) => (
            <CropNewsCard post={item} key={i} />
          ))}
        </CardsHolder>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>
            Не вдалося знайти інші новини
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            На даний момент немає інших новин
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </>
  );
}
