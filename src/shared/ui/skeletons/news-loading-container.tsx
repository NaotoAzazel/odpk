import { NewsCardSkeleton } from "@/widgets/news-card";
import { CardsHolder } from "@/shared/ui";

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
