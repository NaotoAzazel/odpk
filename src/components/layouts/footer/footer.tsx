import { Button, buttonVariants } from "@/components/ui/button";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { CardsHolder } from "@/components/layouts/cards-holder";
import { Icons } from "@/components/icons";

import { FooterMainSection } from "./footer-main-section";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-blue-950 text-white">
      <MaxWidthWrapper className="py-5 md:py-10">
        <div className="flex border-b border-slate-500 py-6">
          <span className="w-full md:w-1/2 font-heading tracking-tight leading-7 text-xl md:text-3xl font-bold">
            Олександрійський політехнічний фаховий коледж
          </span>
        </div>

        <FooterMainSection />

        <CardsHolder className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <div className="flex flex-col">
            <span className="font-semibold leading-5 tracking-tight text-lg md:text-xl mb-3">
              Графік роботи:
            </span>
            <div className="space-y-2">
              <span className="block leading-5 font-[450]">
                <i className="inline-block min-w-20 pr-3 leading-5 text-gray-300">
                  Пн - пт
                </i>
                <b className="font-normal">08:00 — 15:00</b>
              </span>
              <span className="block leading-5 font-[450]">
                <i className="inline-block min-w-20 pr-3 leading-5 text-gray-300">
                  Сб
                </i>
                <b className="font-normal">вихідний</b>
              </span>
              <span className="block leading-5 font-[450]">
                <i className="inline-block min-w-20 pr-3 leading-5 text-gray-300">
                  Нд
                </i>
                <b className="font-normal">вихідний</b>
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold leading-5 tracking-tight text-lg md:text-xl mb-3">
              З усіх питань:
            </span>
            <div className="flex items-center">
              <Icons.phone className="mr-2 h-4 w-4 text-white" />
              <span>+38 (123) 456-78-90</span>
            </div>
          </div>

          <div>
            <Button size="lg" className="bg-transparent border w-full">
              {/* TODO: open dialog to send feedback */}
              Зворотній зв&apos;язок
            </Button>
            <div className="mt-4 flex flex-row space-x-4">
              <Link
                href={siteConfig.youtube}
                className={cn(buttonVariants(), "bg-transparent border flex-1")}
              >
                <Icons.yt className="h-6 w-6" strokeWidth={1.5} />
              </Link>

              <Link
                href={siteConfig.instagram}
                className={cn(buttonVariants(), "bg-transparent border flex-1")}
              >
                <Icons.instagram className="h-6 w-6" strokeWidth={1.5} />
              </Link>

              <Link
                href={siteConfig.facebook}
                className={cn(buttonVariants(), "bg-transparent border flex-1")}
              >
                <Icons.facebook className="h-6 w-6" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </CardsHolder>
      </MaxWidthWrapper>
    </footer>
  );
}
