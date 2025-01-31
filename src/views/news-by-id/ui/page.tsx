"use client";

import { MaxWidthWrapper } from "@/shared/ui";

import { AnotherNewsSection } from "./another-news-section";
import { NewsContent } from "./news-content";

interface NewsPageProps {
  params: {
    postId: string;
  };
}

export function NewsPageById({ params }: NewsPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="flex h-full w-full">
        <MaxWidthWrapper className="relative my-6 bg-white p-5 xl:rounded-lg">
          <NewsContent newsId={Number(params.postId)} />
          <AnotherNewsSection exceptId={Number(params.postId)} />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
