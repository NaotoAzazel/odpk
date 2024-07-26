import { CardsHolder } from "@/components/layouts/cards-holder";
import { NewsCardSkeleton } from "@/components/skeletons/news-card-skeleton";

interface NewsCardsSectionSkeletonProps {
  cardsCount: number;
}

export function NewsCardsSectionSkeleton({
  cardsCount,
}: NewsCardsSectionSkeletonProps) {
  return (
    <CardsHolder className="grid-cols-1 md:grid-cols-3">
      {Array.from({ length: cardsCount }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </CardsHolder>
  );
}
