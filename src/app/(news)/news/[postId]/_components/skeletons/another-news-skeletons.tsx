import { CardsHolder } from "@/components/layouts/cards-holder";
import { CropCardSkeleton } from "./crop-news-card-skeleton";

export async function AnotherNewsSectionSkeleton() {
  return (
    <CardsHolder className="grid-cols-1 lg:grid-cols-3">
      <CropCardSkeleton />
      <CropCardSkeleton />
      <CropCardSkeleton />
    </CardsHolder>
  );
}
