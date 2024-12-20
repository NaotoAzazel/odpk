"use client";

import { useEffect, useState } from "react";
import { Post } from "@prisma/client";
import { useInView } from "react-intersection-observer";

import { paginationConfig } from "@/config/pagination";
import {
  getNewsForPagination,
  GetNewsForPaginationResult,
} from "@/lib/actions/news";
import { NewsCard } from "@/components/cards/news-card";
import { Icons } from "@/components/icons";
import { CardsHolder } from "@/components/layouts/cards-holder";
import { NoItemsPlaceholder } from "@/components/no-items-plaiceholder";

interface NewsFeedProps {
  initialNews: GetNewsForPaginationResult;
}

export function NewsFeed({ initialNews }: NewsFeedProps) {
  const { data, metadata } = initialNews;

  const [news, setNews] = useState<Post[]>(data);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView();

  async function loadMore() {
    const next = page + 1;
    const news = await getNewsForPagination({
      page: next,
      itemsPerPage: paginationConfig.newsPage.newsPerPage,
    });

    if (news.data?.length) {
      setPage(next);
      setNews((prev: Post[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...news.data,
      ]);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div>
      {news.length ? (
        <div className="flex flex-col gap-2">
          <CardsHolder className="w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <NewsCard post={item} key={i} />
            ))}
          </CardsHolder>

          {metadata.totalNewsCount !== news.length && (
            <div className="mt-4 flex flex-row items-center justify-center">
              <Icons.spinner ref={ref} className="mr-2 size-5 animate-spin" />
              <span>Завантаження...</span>
            </div>
          )}
        </div>
      ) : (
        <NoItemsPlaceholder
          title="Не вдалось знайти новини"
          description="Спробуйте змінити фільтри, або перевірте пізніше"
        />
      )}
    </div>
  );
}
