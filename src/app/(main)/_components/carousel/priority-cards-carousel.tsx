"use client";

import { PriorityCard } from "@/components/cards/priority-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { priorityCards } from "@/config/cards";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
        {priorityCards.map((item, i) => (
          <CarouselItem
            key={i}
            className="md:basis-1/2 pl-2 lg:basis-1/3 lg:pl-3"
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
