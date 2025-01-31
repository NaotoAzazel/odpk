"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { NewsCard } from "@/widgets/news-card";
import {
  getNewsForPagination,
  NEWS_PER_PAGE,
  NEWS_QUERY_BASE_KEY,
} from "@/entities/news";
import { useIntersection } from "@/shared/lib";
import {
  CardsHolder,
  ErrorContainer,
  Icons,
  NewsLoadingContainer,
  NoItemsPlaceholder,
} from "@/shared/ui";

export function NewsInfinityList() {
  const {
    data: news,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [NEWS_QUERY_BASE_KEY, "list"],
    queryFn: (meta) =>
      getNewsForPagination({
        page: meta.pageParam,
        itemsPerPage: NEWS_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.metadata.hasNextPage ? nextPage : undefined;
    },
    select: (result) => result.pages.flatMap((page) => page.data),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  if (isLoading) {
    return (
      <NewsLoadingContainer
        className="w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        cardsCount={6}
      />
    );
  }

  if (isError) {
    return (
      <ErrorContainer
        title="Виникла помилка з отримання новин"
        description="Ми вже працює над виправленням цієї помилки"
      />
    );
  }

  return (
    <>
      {news ? (
        <div className="flex flex-col gap-2">
          <CardsHolder className="w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <NewsCard post={item} key={i} />
            ))}
          </CardsHolder>

          <div
            className="mt-4 flex flex-row items-center justify-center"
            ref={cursorRef}
          >
            {isFetchingNextPage && (
              <>
                <Icons.spinner className="mr-2 size-5 animate-spin" />
                <span>Завантаження...</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <NoItemsPlaceholder
          title="Не вдалось знайти новини"
          description="Спробуйте змінити фільтри, або перевірте пізніше"
        />
      )}
    </>
  );
}
