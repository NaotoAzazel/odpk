import { HelpCard } from "@/types";
import Link from "next/link";

interface HelpFooterCardProps {
  card: HelpCard;
}

export function HelpFooterCard({ card }: HelpFooterCardProps) {
  return (
    <div className="flex flex-col">
      <span className="mb-4 font-semibold leading-5 tracking-tight text-lg md:text-xl">
        {card.title}
      </span>
      <div className="flex flex-col space-y-3 md:space-y-2">
        {card.items.map((item, i) => (
          <Link
            className="leading-5 text-gray-300"
            href={item.href}
            key={i}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
