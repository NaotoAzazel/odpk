import { Skeleton } from "@/shared/ui";

export function EditorContentSkeleton() {
  return (
    <div className="my-10 flex flex-col gap-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <div className="flex w-full items-center gap-2">
          <div className="flex flex-1 items-center">
            <Skeleton className="h-10 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
      <div className="flex w-full border-zinc-200">
        <Skeleton className="min-h-[600px] w-full" />
      </div>
    </div>
  );
}
