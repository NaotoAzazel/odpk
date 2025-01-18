import { Skeleton } from "@/shared/ui";

export function NewsHeadingSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-4/5" />
      <Skeleton className="h-8 w-1/2" />
    </div>
  );
}
