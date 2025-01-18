import { getAnotherNews } from "@/entities/news";
import { CardsHolder, CropNewsCard, NoItemsPlaceholder } from "@/shared/ui";

interface AnotherNewsCardsProps {
  newsPromise: ReturnType<typeof getAnotherNews>;
}

export async function AnotherNewsCards({ newsPromise }: AnotherNewsCardsProps) {
  const anotherNews = await newsPromise;

  return (
    <>
      {anotherNews.length ? (
        <CardsHolder className="grid-cols-1 lg:grid-cols-3">
          {anotherNews.map((item, i) => (
            <CropNewsCard post={item} key={i} />
          ))}
        </CardsHolder>
      ) : (
        <NoItemsPlaceholder
          title="Не вдалося знайти інші новини"
          description="На даний момент немає інших новин"
        />
      )}
    </>
  );
}
