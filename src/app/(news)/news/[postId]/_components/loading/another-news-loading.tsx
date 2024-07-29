import { CardsHolder } from "@/components/layouts/cards-holder";
import { CropCardSkeleton } from "@/components/skeletons/crop-news-card-skeleton";

export async function AnotherNewsSectionLoading() {
  return (
    <CardsHolder className="grid-cols-1 lg:grid-cols-3">
      <CropCardSkeleton />
      <CropCardSkeleton />
      <CropCardSkeleton />
    </CardsHolder>
  );
}
