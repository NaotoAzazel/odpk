import { CardsHolder } from "@/components/layouts/cards-holder";
import { NewsCardSkeleton } from "@/components/skeletons/news-card-skeleton";

interface NewsLoadingContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cardsCount: number;
}

export function NewsLoadingContainer({
  cardsCount,
  className,
}: NewsLoadingContainerProps) {
  return (
    <CardsHolder className={className}>
      {Array.from({ length: cardsCount }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </CardsHolder>
  );
}
