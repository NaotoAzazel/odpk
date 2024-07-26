"use client";

import { SpecialtiesCard } from "@/components/cards/specialties-card";
import { CardsHolder } from "@/components/layouts/cards-holder";
import { specialties } from "@/config/cards";

import { motion } from "framer-motion";

export function SpecialtieCardsHolder() {
  return (
    <CardsHolder className="mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {specialties.map((specialtie, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          viewport={{ once: true }}
        >
          <SpecialtiesCard specialtie={specialtie} key={i} />
        </motion.div>
      ))}
    </CardsHolder>
  );
}
