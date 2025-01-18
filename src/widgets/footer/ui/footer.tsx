import Link from "next/link";

import { SITE_CONFIG } from "@/shared/constants";
import { cn } from "@/shared/lib";
import {
  buttonVariants,
  CardsHolder,
  Icons,
  MaxWidthWrapper,
} from "@/shared/ui";

import { FeedbackDialog, FooterMainSection } from ".";

export function Footer() {
  return (
    <footer className="border-t bg-blue-950 text-white">
      <MaxWidthWrapper className="py-5 md:py-10">
        <div className="flex border-b border-slate-500 py-6">
          <span className="w-full font-heading text-xl font-bold leading-7 tracking-tight md:w-1/2 md:text-3xl">
            Олександрійський політехнічний фаховий коледж
          </span>
        </div>

        <FooterMainSection />

        <CardsHolder className="mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <span className="mb-3 text-lg font-semibold leading-5 tracking-tight md:text-xl">
              Графік роботи:
            </span>
            <div className="space-y-2">
              <span className="block font-[450] leading-5">
                <i className="inline-block min-w-20 pr-3 leading-5 text-gray-300">
                  Пн - пт
                </i>
                <b className="font-normal">08:00 — 15:00</b>
              </span>
              <span className="block font-[450] leading-5">
                <i className="inline-block min-w-20 pr-3 leading-5 text-gray-300">
                  Сб
                </i>
                <b className="font-normal">вихідний</b>
              </span>
              <span className="block font-[450] leading-5">
                <i className="inline-block min-w-20 pr-3 leading-5 text-gray-300">
                  Нд
                </i>
                <b className="font-normal">вихідний</b>
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="mb-3 text-lg font-semibold leading-5 tracking-tight md:text-xl">
              З усіх питань:
            </span>
            <div className="flex items-center">
              <Icons.phone className="mr-2 h-4 w-4 text-white" />
              <span>+38 (123) 456-78-90</span>
            </div>
          </div>

          <div>
            <FeedbackDialog />
            <div className="mt-4 flex flex-row space-x-4">
              <Link
                href={SITE_CONFIG.links.youtube}
                className={cn(buttonVariants(), "flex-1 border bg-transparent")}
              >
                <Icons.yt className="h-6 w-6" strokeWidth={1.5} />
              </Link>

              <Link
                href={SITE_CONFIG.links.instagram}
                className={cn(buttonVariants(), "flex-1 border bg-transparent")}
              >
                <Icons.instagram className="h-6 w-6" strokeWidth={1.5} />
              </Link>

              <Link
                href={SITE_CONFIG.links.facebook}
                className={cn(buttonVariants(), "flex-1 border bg-transparent")}
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
