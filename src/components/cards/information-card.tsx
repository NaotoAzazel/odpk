import { InformatioCard } from "@/types";
import Link from "next/link";

import { Icons } from "@/components/icons";

interface informationCardProps {
  card: InformatioCard;
};

export function InfromationCard({ card }: informationCardProps) {
  const Icon = Icons[card.icon];

  return (
    <div className="relative overflow-hidden rounded border border-borderColor p-2">
      <div className="flex h-[150px] flex-col justify-between rounded-md p-6">
        <div className="flex h-12 w-12">
          <Icon className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <Link
            href={card.href}
            className="underline underline-offset-4"
          >
            {card.title}
          </Link>
        </div>
      </div>
    </div>
  )
}