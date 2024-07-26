"use client";

import { AboutCollege } from "@/components/cards/about-college-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { aboutCollege } from "@/config/cards";
import { motion } from "framer-motion";

export function AboutCollegeCardsCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mt-6 w-full cursor-grab"
    >
      <CarouselContent className="h-auto">
        {aboutCollege.map((text, i) => (
          <CarouselItem
            key={i}
            className="sm:basis-1/2 pl-2 md:basis-1/3 lg:basis-1/4 lg:pl-3 xl:basis-1/5"
          >
            <motion.div
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <AboutCollege text={text} index={++i} />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
