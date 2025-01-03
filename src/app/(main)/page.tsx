import { Suspense } from "react";
import Link from "next/link";
import LandingImage from "@/assets/images/landing.jpg";

import { buttonVariants } from "@/components/ui/button";
import ErrorBoundary from "@/components/error-boundary";
import { ErrorContainer } from "@/components/error-container";
import { ResponsiveImage } from "@/components/image/responsive-image";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { NewsLoadingContainer } from "@/components/skeletons/news-loading-container";

import { AboutCollegeCardsCarousel } from "./_components/carousel/about-college-cards-carousel";
import { CollegeInfoSection } from "./_components/sections/college-info-section";
import { NewsCardsSection } from "./_components/sections/news-cards-section";
import { SpecialtieCardsHolder } from "./_components/specialtie-cards-holder";

export const metadata = {
  title: "Головна",
};

export default function Home() {
  return (
    <>
      <section className="relative flex h-screen items-center justify-center">
        <ResponsiveImage
          src={LandingImage}
          className="absolute left-0 top-0 h-screen w-full object-cover"
          alt="Landing-image"
          loading="lazy"
          width={1000}
          height={1000}
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
            <Link href="/*" className={buttonVariants({ variant: "outline" })}>
              Розклад занять
            </Link>
            <Link href="/*" className={buttonVariants()}>
              Роздклад дзвiнкiв
            </Link>
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

          <AboutCollegeCardsCarousel />
        </MaxWidthWrapper>
      </section>

      <section className="py-20 lg:py-32">
        <MaxWidthWrapper>
          <h2 className="text-heading text-3xl font-bold tracking-tight text-gray-800 md:text-4xl lg:text-5xl">
            Спеціальності
          </h2>

          <SpecialtieCardsHolder />
        </MaxWidthWrapper>
      </section>

      <section className="flex overflow-hidden bg-slate-50 py-4">
        <MaxWidthWrapper className="bg-blue-950 p-8 text-white md:p-16 xl:rounded-lg">
          <CollegeInfoSection />
        </MaxWidthWrapper>
      </section>

      <section className="py-20 lg:py-32">
        <MaxWidthWrapper className="space-y-5 overflow-hidden">
          <ErrorBoundary
            fallback={
              <ErrorContainer
                title="Виникла помилка з отримання новин"
                description="Ми вже працює над виправленням цієї помилки"
              />
            }
          >
            <Suspense
              fallback={
                <NewsLoadingContainer
                  className="grid-cols-1 md:grid-cols-3"
                  cardsCount={3}
                />
              }
            >
              <NewsCardsSection />
            </Suspense>
          </ErrorBoundary>

          <div className="flex justify-center">
            <Link href="/news" className={buttonVariants()}>
              Всі новини
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
