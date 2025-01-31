"use client";

import { useQuery } from "@tanstack/react-query";

import { getAnotherNews } from "@/entities/news";
import {
  CardsHolder,
  CropNewsCard,
  ErrorContainer,
  NoItemsPlaceholder,
} from "@/shared/ui";

import { ANOTHER_NEWS_AMOUNT } from "../../constants";
import { AnotherNewsCardsSkeleton } from "./another-news-cards-skeleton";

interface AnotherNewsCardsHolderProps {
  exceptId: number;
}

export function AnotherNewsCardsHolder({
  exceptId,
}: AnotherNewsCardsHolderProps) {
  const {
    data: anotherNews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news", "another"],
    queryFn: () =>
      getAnotherNews({
        exceptId,
        itemsPerPage: ANOTHER_NEWS_AMOUNT,
      }),
  });

  if (isLoading) {
    return <AnotherNewsCardsSkeleton />;
  }

  if (isError) {
    return <ErrorContainer title="Виникла помилка з отримання новин" />;
  }

  return (
    <>
      {anotherNews?.length ? (
        <CardsHolder className="grid-cols-1 lg:grid-cols-3">
          {anotherNews.map((item, i) => (
            <CropNewsCard post={item} key={i} />
          ))}
        </CardsHolder>
      ) : (
        <NoItemsPlaceholder
          title="Не вдалося знайти інші новини"
          description="На даний момент немає інших новин"
        />
      )}
    </>
  );
}
