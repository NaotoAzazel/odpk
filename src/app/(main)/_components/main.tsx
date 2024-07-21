import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Picture } from "@/components/picture";

import { CardsHolder } from "@/components/layouts/cards-holder";
import { SpecialtiesCard } from "@/components/cards/specialties-card";

import { AboutCollegeCardsSwiper } from "./swiper/about-college-cards-swiper";
import { NewsCardsSwiper } from "./swiper/news-cards-swiper";
import { SwiperCards } from "./swiper/swiper-cards";

import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";

import { specialties } from "@/config/cards";
import { getFutureNews } from "@/lib/actions/news";

import LandingImage from "@/assets/images/landing.jpg";

interface LobbyProps {
  newsPromise: ReturnType<typeof getFutureNews>;
}

export async function Main({ newsPromise }: LobbyProps) {
  const [news] = await Promise.all([newsPromise]);

  return (
    <>
      <section className="h-screen relative flex items-center justify-center">
        <Picture
          src={LandingImage}
          className="absolute top-0 left-0 h-screen w-full object-cover"
        />
        <div className="absolute top-0 left-0 h-screen w-full bg-black opacity-40" />
        <div className="container text-center flex flex-col items-center max-w-4xl space-y-4 my-44">
          <h1
            className="animate-fade-up font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter lg:leading-[1.1]"
            style={{ animationDelay: "0.20s", animationFillMode: "both" }}
          >
            Олександрiйський полiтехнiчний фаховий коледж
          </h1>

          <p
            className="animate-fade-up max-w-[700px] text-lg text-primary-foreground font-sans"
            style={{ animationDelay: "0.30s", animationFillMode: "both" }}
          >
            Наш коледж готує фахівців високої кваліфікації у рiзний сучасних
            галузях.
          </p>

          <div
            className="animate-fade-up flex gap-4 flex-col sm:flex-row sm:justify-between"
            style={{ animationDelay: "0.40s", animationFillMode: "both" }}
          >
            <Link href="/*" className={buttonVariants({ variant: "outline" })}>
              Розклад занять
            </Link>
            <Link href="/*" className={buttonVariants()}>
              Роздклад дзвiнкiв
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-32 overflow-hidden">
        <MaxWidthWrapper>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-800">
            Наш коледж — <strong className="text-primary">місце</strong>, де
            формується нове покоління фахівців
          </h2>
          <p className="text-gray-800 font-medium mt-4 text-lg lg:text-2xl max-w-[1050px]">
            Ми пропонуємо програми навчання для всіх, забезпечуючи їм
            високоякісну професійну та бізнес-освіту
          </p>

          <AboutCollegeCardsSwiper />
        </MaxWidthWrapper>
      </section>

      <section className="py-20 lg:py-32">
        <MaxWidthWrapper>
          <h2 className="text-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-800">
            Спеціальності
          </h2>

          <CardsHolder className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {specialties.map((specialtie, i) => (
              <SpecialtiesCard specialtie={specialtie} key={i} />
            ))}
          </CardsHolder>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-50 flex py-4 overflow-hidden">
        <MaxWidthWrapper className="bg-blue-950 xl:rounded-lg text-white p-8 md:p-16">
          <div>
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter mb-12">
                Про коледж
              </h2>
              <h3 className="font-heading font-semibold text-xl md:text-2xl lg:text-3xl max-w-xl mb-5">
                Наша мета — якісна освіта для вашої успішної кар&apos;єри
              </h3>
            </div>
            <div>
              <p className="leading-6 text-lg">
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
          <h2 className="text-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-800">
            Новини
          </h2>

          <div>
            <NewsCardsSwiper news={news} />
          </div>

          <div className="flex justify-center">
            <Link href="/news" className={buttonVariants({ size: "lg" })}>
              Всі новини
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
