"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { helpCards } from "@/config/cards";

import { CardsHolder } from "@/components/layouts/cards-holder";
import { HelpFooterCard } from "@/components/cards/help-footer-card";
import { MobileFooter } from "./mobile-footer";

export function FooterMainSection() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="pb-6 border-b border-slate-500">
      {isDesktop ? (
        <CardsHolder className="mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 gap-4">
          {helpCards.map((card, i) => (
            <HelpFooterCard card={card} key={i} />
          ))}
        </CardsHolder>
      ) : (
        <MobileFooter />
      )}
    </div>
  );
}
