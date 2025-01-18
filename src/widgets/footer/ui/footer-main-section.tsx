"use client";

import { HELP_CARDS } from "@/shared/constants";
import { CardsHolder, HelpFooterCard, useMediaQuery } from "@/shared/ui";

import { MobileFooter } from "./mobile-footer";

export function FooterMainSection() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="border-b border-slate-500 pb-6">
      {isDesktop ? (
        <CardsHolder className="mt-6 grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
          {HELP_CARDS.map((card, i) => (
            <HelpFooterCard card={card} key={i} />
          ))}
        </CardsHolder>
      ) : (
        <MobileFooter />
      )}
    </div>
  );
}
