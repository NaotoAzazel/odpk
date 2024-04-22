import { HelpCard as HelpCardType } from "@/types";
import Link from "next/link";

const a = ["Керивниики груп", "Кращи студенти"]

interface HelpCardProps {
  card: HelpCardType;
};

export function HelpCard({ card }: HelpCardProps) {
  return (
    <div className="border rounded">
      <div className="px-4 pt-4">
        <h2 className="font-bold font-heading text-xl">
          {card.title}
        </h2>
      </div>
      <div className="space-y-2 p-4 flex flex-col">
        {card.items.map((item, i) => (
          <Link
            href={item.href}
            className="underline underline-offset-4"
            key={i}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}