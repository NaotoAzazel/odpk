import { Suspense } from "react";

import { getFutureNews } from "@/lib/actions/news";

import Lobby from "./_components/lobby";
import { LobbySkeleton } from "./_components/lobby-skeleton";

export default function Home() {
  const newsPromise = getFutureNews();

  return (
    <Suspense fallback={<LobbySkeleton />}>
      <Lobby 
        newsPromise={newsPromise} 
      />
    </Suspense>
  );
}
