import { Skeleton } from "@/shared/ui";

interface ButtonsSkeletonProps {
  buttonsCount: number;
}

export function ButtonsSkeleton({ buttonsCount }: ButtonsSkeletonProps) {
  return (
    <div className="flex gap-4">
      {Array.from({ length: buttonsCount }).map((_, i) => (
        <Skeleton className="h-10 w-32" key={i} />
      ))}
    </div>
  );
}
