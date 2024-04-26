import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col mt-20 gap-6">
      <Skeleton className="w-full min-h-[600px]" />
      <div className="w-full flex justify-end">
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
}