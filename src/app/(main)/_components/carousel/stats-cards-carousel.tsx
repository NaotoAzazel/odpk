"use client";

import { StatsCard } from "@/components/cards/stats-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { statsCards } from "@/config/cards";
import { motion } from "framer-motion";

export function StatsCardsCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mt-6 w-full cursor-grab"
    >
      <CarouselContent className="h-auto">
        {statsCards.map((item, i) => (
          <CarouselItem
            key={i}
            className="basis-1/2 pl-2 md:basis-1/3 lg:basis-1/4 lg:pl-3"
          >
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <StatsCard key={i} content={item} />{" "}
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
