import { InformatioCard } from "@/types";
import Link from "next/link";

import { Icons } from "@/components/icons";

interface InformationCardProps {
  card: InformatioCard;
};

export function InfromationCard({ card }: InformationCardProps) {
  const Icon = Icons[card.icon];

  return (
    <Link
      href={card.href}
    >
      <div className="relative shadow overflow-hidden rounded border p-2 hover:bg-accent/75 hover:cursor-pointer transform transition-all duration-200 hover:scale-105">
        <div className="flex h-[150px] flex-col justify-between rounded-md p-6">
          <div className="flex h-12 w-12">
            <Icon className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <p >{card.title}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}