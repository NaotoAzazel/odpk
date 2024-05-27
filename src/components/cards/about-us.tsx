import { AboutUsCard as AboutUsCardType } from "@/types";

interface AboutUsCardProps {
  card: AboutUsCardType;
}

export function AboutUsCard({ card }: AboutUsCardProps) {
  return (
    <div className="border rounded shadow bg-background space-y-2 w-full">
      <h1 className="font-heading font-bold text-lg md:text-xl px-4 pt-4">
        {card.title}
      </h1>
      <p className="text-sm md:text-base text-muted-foreground px-4 pb-4">
        {card.description}
      </p>
    </div>
  );
}
