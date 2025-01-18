import { Skeleton } from "@/shared/ui";

export function NewsCardSkeleton() {
  return (
    <div className="overflow-hidden rounded border">
      <div className="flex">
        <Skeleton className="w-full rounded-none py-36" />
      </div>

      <div className="p-4">
        <Skeleton className="mb-4 h-8 w-10/12" />
        <Skeleton className="h-5 w-1/3 px-3" />
      </div>
    </div>
  );
}
