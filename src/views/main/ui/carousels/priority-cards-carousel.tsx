"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { PRIORITY_CARDS } from "@/shared/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  PriorityCard,
} from "@/shared/ui";

export function PriorityCardsCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mt-6 w-full cursor-grab"
      ref={ref}
    >
      <CarouselContent className="h-auto">
        {PRIORITY_CARDS.map((item, i) => (
          <CarouselItem
            key={i}
            className="pl-2 md:basis-1/2 lg:basis-1/3 lg:pl-3"
          >
            <motion.div
              key={i}
              initial={{ scale: 0.7 }}
              animate={isInView && { scale: 1 }}
              className="h-auto"
            >
              <PriorityCard key={i} content={item} />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
