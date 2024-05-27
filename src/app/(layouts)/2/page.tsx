import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Picture } from "@/components/picture";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";

import { MulticolorStitch } from "./_components/multicolor-stitch";
import { CenterLobbyHeader } from "./_components/lobby-center-header";
import { LeftLobbyHeader } from "./_components/lobby-left-header";

import { InfoCard } from "@/components/cards/new-info-card";
import { CardsHolder } from "@/components/cards/cards-holder";
import { AboutUsCard } from "@/components/cards/about-us";
import { NewNewsCard } from "@/components/cards/new-news-card";

import { aboutUs, heroCards, newInformationCard } from "@/config/cards";
import { getFutureNews } from "@/lib/actions/news";

import MenPicture from "@/assets/images/hero-image.png";
import CollegePhoto from "@/assets/images/college.jpg";

import Link from "next/link";

export default async function Page() {
  const news = await getFutureNews();

  return (
    <div>
      <section
        id="hero"
        className="h-screen-md py-20 lg:py-28 mx-auto items-center flex flex-col bg-gradient-to-r from-primary/15 to-white"
      >
        <MaxWidthWrapper className="pt-20 overflow-hidden relative items-center justify-between flex flex-col lg:flex-row">
          <div className="flex flex-col gap-6 max-w-2xl">
            <LeftLobbyHeader
              heading="Олександрiйський полiтехнiчний фаховий коледж"
              text="Наш коледж готує фахівців високої кваліфікації у рiзний сучасних
              галузях"
              className="text-center lg:text-left"
            />

            <div className="flex gap-4 flex-col md:flex-row justify-center lg:justify-start">
              <Link
                href="/*"
                className={buttonVariants({ variant: "outline" })}
              >
                Розклад занять
              </Link>
              <Link href="/*" className={buttonVariants()}>
                Роздклад дзвiнкiв
              </Link>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start justify-center lg:justify-start gap-6 lg:gap-8 mt-8">
              {heroCards.map((card, i) => (
                <>
                  <div key={i} className="space-y-4 text-center max-w-40">
                    <h2 className="font-heading leading-tight font-semibold text-2xl lg:text-3xl">
                      {card.title}
                    </h2>
                    <p className="text-muted-foreground text-base lg:text-xl">
                      {card.description}
                    </p>
                  </div>

                  {i !== heroCards.length - 1 && (
                    <div className="h-20 w-0.5 hidden lg:block bg-slate-300" />
                  )}
                </>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Picture
              src={MenPicture}
              className="w-10/12 lg:h-full object-fill mt-4 lg:mt-0 drop-shadow-xl"
            />
          </div>
        </MaxWidthWrapper>
      </section>

      <section id="information" className="py-8 md:py-12 lg:py-24">
        <MaxWidthWrapper className="flex flex-col gap-6">
          <CenterLobbyHeader
            heading="Корисна інформація"
            text="Корисна інформація про наш коледж, навчальний процес та послуги"
          />

          <div className="flex flex-col gap-4">
            <div className="hidden xl:flex flex-row">
              <MulticolorStitch />
            </div>

            <CardsHolder className="grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-0">
              {newInformationCard.map((card, i) => (
                <InfoCard card={card} key={i} />
              ))}
            </CardsHolder>
          </div>
        </MaxWidthWrapper>
      </section>

      <section id="about-us" className="py-8 md:py-12 lg:py-24 bg-slate-50">
        <MaxWidthWrapper className="flex flex-col gap-6">
          <CenterLobbyHeader
            heading="Про нас"
            text="Iнформація про те, що ми надаємо нашим студентам."
          />

          <div className="relative items-center justify-between flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col w-full lg:w-auto">
              <CardsHolder className="grid-cols-1 w-full">
                {aboutUs.map((card, index) => (
                  <AboutUsCard card={card} key={index} />
                ))}
              </CardsHolder>
            </div>

            <div className="flex justify-center md:justify-end">
              <Picture src={CollegePhoto} className="object-fill shadow-xl" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section id="news" className="py-8 md:py-12 lg:py-24">
        <MaxWidthWrapper className="space-y-6">
          <LeftLobbyHeader heading="Новини" text="Цікаві новини нашого колежда">
            <Link href="/news" className={buttonVariants()}>
              Переглянути всі
            </Link>
          </LeftLobbyHeader>

          {!news.length ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="notebook" />
              <EmptyPlaceholder.Title>
                Не вдалось знайти новини
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                На даний момент не додано жодної новини
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          ) : (
            <CardsHolder className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {news.slice(0, 6).map((item, i) => (
                <NewNewsCard post={item} key={i} />
              ))}
            </CardsHolder>
          )}
        </MaxWidthWrapper>
      </section>

      {/** TODO: make student-center section */}

      {/* <section id="student-center" className="py-8 md:py-12 lg:py-24">
        <MaxWidthWrapper className="space-y-6"></MaxWidthWrapper>
      </section> */}
    </div>
  );
}
