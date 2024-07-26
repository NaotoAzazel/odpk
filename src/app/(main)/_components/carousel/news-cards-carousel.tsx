"use client";

import { NewsCard } from "@/components/cards/news-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Post } from "@/types";

import { useEffect, useState } from "react";

interface NewsCardsCarouselProps {
  news: Post[];
}

export function NewsCardsCarousel({ news }: NewsCardsCarouselProps) {
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
      <Carousel
        opts={{
          align: "start",
        }}
        className="mt-6 w-full cursor-grab overflow-hidden"
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
