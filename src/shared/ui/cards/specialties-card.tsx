import Link from "next/link";

import { cn } from "@/shared/lib";
import { SpecialtieCard } from "@/shared/model";
import { buttonVariants, Icons } from "@/shared/ui";

export function SpecialtiesCard({
  specialtie,
}: {
  specialtie: SpecialtieCard;
}) {
  const { name, href, label } = specialtie;

  return (
    <div className="group relative flex h-full min-h-44 w-full cursor-default flex-col items-start justify-start rounded-md border bg-slate-50 p-4 transition-colors duration-200 hover:bg-primary md:min-h-48">
      <div className="text-sm text-muted-foreground group-hover:text-white">
        {label}
      </div>
      <h5 className="font-heading text-xl font-semibold tracking-tight group-hover:text-white md:text-2xl">
        {name}
      </h5>
      <div className="mt-auto flex h-12 items-center">
        <Link
          href={href}
          className={cn(
            buttonVariants(),
            "group-hover:bg-white group-hover:text-gray-900",
          )}
        >
          <span>Детальніше</span>
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
