import MaxWidthWrapper from "@/components/max-width-wrapper";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { LobbySkeleton } from "./_components/lobby-skeleton";
import { buttonVariants } from "@/components/ui/button";

import { CardsHolder } from "@/components/cards/cards-holder";
import { InfromationCard } from "@/components/cards/information-card";
import { HelpCard } from "@/components/cards/help-card";
import { NewsCard } from "@/components/cards/news-card";

import { helpCards, informationCards } from "@/config/cards";

import Link from "next/link";
import { Suspense } from "react";

import newsJson from "@/assets/data/news.json";

export default function Home() {
  return (
    <div>
      <section 
        className="container animate-fade-up py-20 lg:py-44 mx-auto text-center flex flex-col items-center max-w-4xl space-y-4"
        style={{ animationDelay: "0.10s", animationFillMode: "both" }}
      >
        <h1 
          className="animate-fade-up font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.20s", animationFillMode: "both" }}
        >
          Олександрiйський полiтехнiчний фаховий коледж
        </h1>

        <p 
          className="animate-fade-up max-w-[700px] text-lg text-muted-foreground font-sans"
          style={{ animationDelay: "0.30s", animationFillMode: "both" }}
        >
          Наш коледж готує фахівців високої кваліфікації у рiзний сучасних галузях.
        </p>

        <div 
          className="animate-fade-upnpm flex gap-4 flex-col sm:flex-row sm:justify-between"
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
          
          {!newsJson.length ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="notebook" />
              <EmptyPlaceholder.Title>Не вдалось знайти новини</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                На даний момент не додано жодної новини
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          ): (
            <Suspense fallback={<LobbySkeleton />}>
              <CardsHolder className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {newsJson.slice(0, 6).map((item, i) => (
                  <NewsCard post={item} key={i} />
                ))}
              </CardsHolder>
            </Suspense>
          )}
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
