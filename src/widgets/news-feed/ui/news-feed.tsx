"use client";

import { useEffect, useState } from "react";
import { Post } from "@prisma/client";
import { useInView } from "react-intersection-observer";

import { NewsCard } from "@/widgets/news-card";
import {
  getNewsForPagination,
  GetNewsForPaginationResult,
  NEWS_PER_PAGE,
} from "@/entities/news";
import { CardsHolder, Icons, NoItemsPlaceholder } from "@/shared/ui";

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
      itemsPerPage: NEWS_PER_PAGE,
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
