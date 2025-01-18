import Link from "next/link";

import { buttonVariants, MaxWidthWrapper } from "@/shared/ui";

export function NotFoundPage() {
  return (
    <MaxWidthWrapper className="flex h-screen items-center justify-center">
      <section className="max-w-screen-md space-y-4 text-center">
        <div className="space-y-4">
          <h1 className="font-heading text-5xl font-bold leading-10">404</h1>
          <p className="text-xl text-muted-foreground">
            <span>
              Сторінка, яку Ви запитуєте, не існує, або вона видалена. Можливо,
              Ви набрали неправильну адресу.
            </span>
          </p>
        </div>

        <div>
          <Link href="/" className={buttonVariants({})}>
            Головна
          </Link>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
