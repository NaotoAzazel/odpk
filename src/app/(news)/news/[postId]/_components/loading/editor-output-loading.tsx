import { Skeleton } from "@/components/ui/skeleton";

export async function LoadingEditorOutput() {
  return (
    <div className="py-5 space-y-1">
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
