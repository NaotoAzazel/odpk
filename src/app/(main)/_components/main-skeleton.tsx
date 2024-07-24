import { SpecialtiesCard } from "@/components/cards/specialties-card";
import { CardsHolder } from "@/components/layouts/cards-holder";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Picture } from "@/components/picture";
import { NewsCardSkeleton } from "@/components/skeletons/news-card-skeleton";
import { Button } from "@/components/ui/button";

import { specialties } from "@/config/cards";

import { AboutCollegeCardsSwiper } from "./swiper/about-college-cards-swiper";
import { SwiperCards } from "./swiper/swiper-cards";

import LandingImage from "@/assets/images/landing.jpg";

export function MainSkeleton() {
  return (
    <>
      <section className="relative flex h-screen items-center justify-center">
        <Picture
          src={LandingImage}
          className="absolute left-0 top-0 h-screen w-full object-cover"
          widht={200}
          height={200}
          alt="Landing-image"
        />
        <div className="absolute left-0 top-0 h-screen w-full bg-black opacity-40" />
        <div className="container my-44 flex max-w-4xl flex-col items-center space-y-4 text-center">
          <h1
            className="animate-fade-up font-heading text-4xl font-bold tracking-tighter text-white md:text-6xl lg:text-7xl lg:leading-[1.1]"
            style={{ animationDelay: "0.20s", animationFillMode: "both" }}
          >
            Олександрiйський полiтехнiчний фаховий коледж
          </h1>

          <p
            className="max-w-[700px] animate-fade-up font-sans text-lg text-primary-foreground"
            style={{ animationDelay: "0.30s", animationFillMode: "both" }}
          >
            Наш коледж готує фахівців високої кваліфікації у рiзний сучасних
            галузях.
          </p>

          <div
            className="flex animate-fade-up flex-col gap-4 sm:flex-row sm:justify-between"
            style={{ animationDelay: "0.40s", animationFillMode: "both" }}
          >
            <Button variant="outline">Розклад занять</Button>
            <Button>Роздклад дзвiнкiв</Button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-50 py-20 lg:py-32">
        <MaxWidthWrapper>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-800 md:text-4xl lg:text-5xl">
            Наш коледж — <strong className="text-primary">місце</strong>, де
            формується нове покоління фахівців
          </h2>
          <p className="mt-4 max-w-[1050px] text-lg font-medium text-gray-800 lg:text-2xl">
            Ми пропонуємо програми навчання для всіх, забезпечуючи їм
            високоякісну професійну та бізнес-освіту
          </p>

          <AboutCollegeCardsSwiper />
        </MaxWidthWrapper>
      </section>

      <section className="py-20 lg:py-32">
        <MaxWidthWrapper>
          <h2 className="text-heading text-3xl font-bold tracking-tight text-gray-800 md:text-4xl lg:text-5xl">
            Спеціальності
          </h2>

          <CardsHolder className="mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {specialties.map((specialtie, i) => (
              <SpecialtiesCard specialtie={specialtie} key={i} />
            ))}
          </CardsHolder>
        </MaxWidthWrapper>
      </section>

      <section className="flex overflow-hidden bg-slate-50 py-4">
        <MaxWidthWrapper className="bg-blue-950 p-8 text-white md:p-16 xl:rounded-lg">
          <div>
            <div>
              <h2 className="mb-12 font-heading text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                Про коледж
              </h2>
              <h3 className="mb-5 max-w-xl font-heading text-xl font-semibold md:text-2xl lg:text-3xl">
                Наша мета — якісна освіта для вашої успішної кар&apos;єри
              </h3>
            </div>
            <div>
              <p className="text-lg leading-6">
                В «Олександрійському політехнічному фаховому коледжі» готують
                висококласних фахівців, затребуваних в Україні та за кордоном.
                Почніть будувати своє професійне майбутнє разом із нами.
              </p>
            </div>
          </div>

          <SwiperCards />
        </MaxWidthWrapper>
      </section>

      <section className="py-20 lg:py-32">
        <MaxWidthWrapper className="space-y-5">
          <h2 className="text-heading text-3xl font-bold tracking-tight text-gray-800 md:text-4xl lg:text-5xl">
            Новини
          </h2>

          <CardsHolder className="grid-cols-1 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </CardsHolder>

          <div className="flex justify-center">
            <Button size="lg">Всі новини</Button>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
