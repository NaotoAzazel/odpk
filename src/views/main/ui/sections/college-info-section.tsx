"use client";

import { motion } from "framer-motion";

import { PriorityCardsCarousel, StatsCardsCarousel } from "../carousels";

export function CollegeInfoSection() {
  return (
    <>
      <div>
        <div>
          <motion.h2
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-12 font-heading text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl"
            viewport={{ once: true }}
          >
            Про коледж
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-5 max-w-xl font-heading text-xl font-semibold md:text-2xl lg:text-3xl"
            viewport={{ once: true }}
          >
            Наша мета — якісна освіта для вашої успішної кар&apos;єри
          </motion.h3>
        </div>
        <div>
          <p className="text-lg leading-6">
            В «Олександрійському політехнічному фаховому коледжі» готують
            висококласних фахівців, затребуваних в Україні та за кордоном.
            Почніть будувати своє професійне майбутнє разом із нами.
          </p>
        </div>
      </div>

      <PriorityCardsCarousel />
      <StatsCardsCarousel />
    </>
  );
}
