import { CardsHolder } from "@/components/cards/cards-holder";
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";

export function LobbySkeleton() {
  return (
    <CardsHolder className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </CardsHolder>
  );
}