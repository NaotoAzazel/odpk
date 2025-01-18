import { CardsHolder, CropNewsCardSkeleton } from "@/shared/ui";

export async function AnotherNewsCardsSkeleton() {
  return (
    <CardsHolder className="grid-cols-1 lg:grid-cols-3">
      <CropNewsCardSkeleton />
      <CropNewsCardSkeleton />
      <CropNewsCardSkeleton />
    </CardsHolder>
  );
}
