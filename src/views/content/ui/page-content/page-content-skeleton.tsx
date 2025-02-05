import { EditorOutputSkeleton } from "@/widgets/editor";
import { Skeleton } from "@/shared/ui";

export function PageContentSkeleton() {
  return (
    <>
      <div className="space-y-2">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-8 w-1/2" />
      </div>
      <EditorOutputSkeleton />
    </>
  );
}
