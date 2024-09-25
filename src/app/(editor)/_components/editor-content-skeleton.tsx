import { Skeleton } from "@/components/ui/skeleton";

export function EditorContentSkeleton() {
  return (
    <div className="flex flex-col gap-4 my-10">
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
      <div className="w-full border-zinc-200 flex">
        <Skeleton className="w-full min-h-[600px]" />
      </div>
    </div>
  );
}