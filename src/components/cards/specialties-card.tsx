import Link from "next/link";
import { SpecialtieCard } from "@/types";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function SpecialtiesCard({
  specialtie,
}: {
  specialtie: SpecialtieCard;
}) {
  const { name, href, label } = specialtie;

  return (
    <div className="group flex-col min-h-44 md:min-h-48 relative flex items-start justify-start w-full h-full p-4 border rounded-md bg-slate-50 hover:bg-primary duration-200 transition-colors cursor-default">
      <div className="text-muted-foreground text-sm group-hover:text-white">
        {label}
      </div>
      <h5 className="font-heading tracking-tight text-xl md:text-2xl font-semibold group-hover:text-white">
        {name}
      </h5>
      <div className="h-12 mt-auto flex items-center">
        <Link
          href={href}
          className={cn(
            buttonVariants(),
            "group-hover:bg-white group-hover:text-gray-900"
          )}
        >
          <span>Детальніше</span>
          <Icons.chevronRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
