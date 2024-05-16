import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";

export const metadata = {
  title: "Сторiнку не знайдено"
};

export default function NotFound() {
  return (
    <MaxWidthWrapper className="flex h-screen items-center justify-center">
      <section className="text-center max-w-screen-md space-y-4">
        <div className="space-y-4">
          <h1 className="text-5xl font-heading font-bold leading-10">
            404
          </h1>
          <p className="text-xl text-muted-foreground">
            <span>
              Сторінка, яку Ви запитуєте, не існує, або вона видалена. Можливо, Ви набрали неправильну адресу.
            </span>
          </p>
        </div>
        
        <div>
          <Link
            href="/"
            className={buttonVariants({})}
          >
            Головна
          </Link>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}