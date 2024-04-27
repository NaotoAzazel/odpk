import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <MaxWidthWrapper className="py-6">
      <Skeleton className="h-12 w-1/2" />
      <hr className="my-4" />

      <div className="mt-6 flex flex-col space-y-4">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </MaxWidthWrapper>
  )
}