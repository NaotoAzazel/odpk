import { Skeleton } from "@/shared/ui";

export async function EditorOutputSkeleton() {
  return (
    <div className="space-y-1 py-5">
      <Skeleton className="h-6 w-4/5" />
      <Skeleton className="h-6 w-2/5" />
      <Skeleton className="h-96 w-full" />

      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-4/5" />
      <Skeleton className="h-6 w-1/6" />
      <Skeleton className="h-6 w-2/5" />
      <Skeleton className="h-6 w-1/5" />
    </div>
  );
}
