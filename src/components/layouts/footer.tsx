import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <MaxWidthWrapper>
        <div className="flex py-6 flex-col gap-4 md:gap-2">
          <div className="-mx-4 grid justify-start lg:grid-flow-col">
            <Link
              href="/contact"
              className={buttonVariants({ variant: "ghost" })}
            >
              Контакти
            </Link>
          </div>
          <p className="font-sans text-sm md:text-left">
            {currentYear} Олександрійський політехнічний фаховий коледж
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}