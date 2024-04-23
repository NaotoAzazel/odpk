import { Picture } from "@/components/picture";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="border overflow-hidden rounded">
      <Picture.Container>
        <Skeleton className="rounded-none w-full py-36"/>
      </Picture.Container>

      <div className="p-4">
        <Skeleton className="h-6 w-1/2" />
      </div>

      <div className="flex pt-1 p-4 w-full items-center">
        <Skeleton className="h-9 px-3 w-1/3"/>
      </div>
    </div>
  );
}