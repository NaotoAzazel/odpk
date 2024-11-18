import { Skeleton } from "@/components/ui/skeleton";

export function MainNavSkeleton() {
  return (
    <div className="flex flex-row gap-4 md:ml-4 lg:ml-8">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-28" />
      <Skeleton className="h-10 w-20" />
    </div>
  );
}
