import { Suspense } from "react";

import { getFutureNews } from "@/lib/actions/news";

import { Main } from "./_components/main";
import { MainSkeleton } from "./_components/main-skeleton";

export default function Home() {
  const newsPromise = getFutureNews();

  return (
    <Suspense fallback={<MainSkeleton />}>
      <Main newsPromise={newsPromise} />
    </Suspense>
  );
}
