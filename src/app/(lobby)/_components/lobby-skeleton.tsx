import { CardsHolder } from "@/components/cards/cards-holder";
import { HelpCard } from "@/components/cards/help-card";
import { InfromationCard } from "@/components/cards/information-card";

import MaxWidthWrapper from "@/components/max-width-wrapper";

import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";

import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";

import { helpCards, informationCards } from "@/config/cards";

import Link from "next/link";

export function LobbySkeleton() {
  return (
    <div>
      <section 
        className="py-20 lg:py-44 mx-auto flex flex-col items-center space-y-4 bg-gradient-to-b from-blue-50 to-white"
      >
        <MaxWidthWrapper>
          <div className="grid max-w-screen-xl lg:grid-cols-12 text-center lg:text-left">
            <div className="mr-auto col-span-7 space-y-6 lg:mx-auto">
              <h1 
                className="animate-fade-up font-heading font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
                style={{ animationDelay: "0.20s", animationFillMode: "both" }}
              >
                Олександрiйський полiтехнiчний фаховий коледж
              </h1>

              <p 
                className="animate-fade-up text-lg text-muted-foreground font-sans lg:mx-auto"
                style={{ animationDelay: "0.30s", animationFillMode: "both" }}
              >
                Наш коледж готує фахівців високої кваліфікації у рiзний сучасних галузях.
              </p>

              <div 
                className="animate-fade-up flex gap-4 flex-col sm:flex-row justify-center lg:justify-start"
                style={{ animationDelay: "0.40s", animationFillMode: "both" }}
              >
                <Link 
                  href="/*" 
                  className={buttonVariants({ variant: "outline" })}
                >
                  Розклад занять
                </Link>
                <Link 
                  href="/*"
                  className={buttonVariants()}
                >
                  Роздклад дзвiнкiв
                </Link>
              </div>
            </div>

            <div className="col-span-1"></div>
            <div className="w-full col-span-4">
              <Skeleton 
                className="w-96 h-96 rounded-xl bg-white shadow-md hidden lg:block"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section 
        id="information" 
        className="animate-fade-up py-8 md:py-12 bg-slate-50 dark:bg-transparent lg:py-24 space-y-6"
        style={{ animationDelay: "0.50s", animationFillMode: "both" }}
      >
        <MaxWidthWrapper className="space-y-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Корисна інформація
            </h2>

            <p className="max-w-[700px] text-lg text-muted-foreground font-sans">
              Корисна інформація про наш коледж, навчальний процес та послуги.
            </p>
          </div>

          <CardsHolder className="grid-cols-2 lg:grid-cols-4">
            {informationCards.map((card, i) => (
              <InfromationCard card={card} key={i} />
            ))}
          </CardsHolder>
        </MaxWidthWrapper>
      </section>

      <MaxWidthWrapper>
        <section 
          id="news" 
          className="animate-fade-up py-8 md:py-12 lg:py-24 space-y-6"
          style={{ animationDelay: "0.60s", animationFillMode: "both" }}
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Новини
            </h2>

            <p className="max-w-[700px] text-lg text-muted-foreground font-sans">
              Цікаві новини нашого колежда
            </p>
          </div>
          <CardsHolder className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </CardsHolder>
        </section>
      </MaxWidthWrapper>

      <section 
        id="information" 
        className="animate-fade-up py-8 md:py-12 bg-slate-50 dark:bg-transparent lg:py-24 space-y-6"
        style={{ animationDelay: "0.70s", animationFillMode: "both" }}
      >
        
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Студентський центр
          </h2>

          <p className="max-w-[700px] text-lg text-muted-foreground font-sans">
            Iнформацiя, яка буде корисна студентам.
          </p>
        </div>

        <MaxWidthWrapper>
          <CardsHolder className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {helpCards.map((card, i) => (
              <HelpCard card={card} key={i} />
            ))}
          </CardsHolder>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}