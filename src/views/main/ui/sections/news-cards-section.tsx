"use client";

import { useQuery } from "@tanstack/react-query";

import { getPublishedNews, NEWS_QUERY_BASE_KEY } from "@/entities/news";
import {
  ErrorContainer,
  NewsLoadingContainer,
  NoItemsPlaceholder,
} from "@/shared/ui";

import { ITEMS_IN_NEWS_CAROUSEL } from "../../constants";
import { NewsCardsCarousel } from "../carousels";

export function NewsCardsSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [NEWS_QUERY_BASE_KEY, "published"],
    queryFn: () => getPublishedNews({ itemsPerPage: ITEMS_IN_NEWS_CAROUSEL }),
  });

  if (isLoading) {
    return (
      <NewsLoadingContainer
        className="grid-cols-1 md:grid-cols-3"
        cardsCount={3}
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
      {data?.length ? (
        <NewsCardsCarousel news={data} title="Новини" />
      ) : (
        <NoItemsPlaceholder
          title="Не вдалось знайти новини"
          description="Спробуйте змінити фільтри, або перевірте пізніше"
        />
      )}
    </>
  );
}
