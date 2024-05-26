import { NewInformationCard } from "@/types";
import { colors } from "@/config/colors";

import { Icons } from "@/components/icons";

import Link from "next/link";

interface InfoCardProps {
  card: NewInformationCard;
}

export function InfoCard({ card }: InfoCardProps) {
  const Icon = Icons[card.icon];

  return (
    <Link href={card.href}>
      <div className="relative shadow rounded-lg bg-slate-50 p-4 flex items-center gap-4 hover:bg-accent/75 transform transition-transform duration-200 hover:scale-105">
        <div className={`p-4 rounded-lg ${colors[card.color].bg}`}>
          <Icon className={`w-10 h-10" ${colors[card.color].text}`} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-heading font-bold pr-2">{card.title}</h1>
        </div>
      </div>
    </Link>
  );
}
