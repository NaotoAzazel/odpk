"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { NewsCard } from "@/components/cards/news-card";
import { Icons } from "@/components/icons";

interface NewsCardsCarouselProps {
  news: Post[];
  title: string;
}

export function NewsCardsCarousel({ news, title }: NewsCardsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="space-x-2">
          <Button
            disabled={current === 1}
            size="sm"
            variant="outline"
            onClick={() => api?.scrollPrev()}
          >
            <Icons.chevronLeft />
          </Button>
          <Button
            disabled={count === current}
            size="sm"
            variant="outline"
            onClick={() => api?.scrollNext()}
          >
            <Icons.chevronRight />
          </Button>
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mt-6 w-full hover:cursor-grab"
        setApi={setApi}
      >
        <CarouselContent className="h-auto">
          {news.map((item, i) => (
            <CarouselItem
              key={i}
              className="overflow-visible md:basis-1/2 lg:basis-1/3 lg:pl-3"
            >
              <NewsCard post={item} key={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="py-2 text-center text-sm text-muted-foreground">
        Поточний слайд {current} з {count}
      </div>
    </div>
  );
}
