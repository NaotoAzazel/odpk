import { Card } from "@/types";

export function PriorityCard({ content }: { content: Card }) {
  const { title, description } = content;

  return (
    <div className="flex flex-col p-4 md:p-5 border h-full bg-white rounded-lg text-gray-800">
      <span className="font-heading tracking-tighter text-xl md:text-2xl font-bold">
        {title}
      </span>
      <span className="text-muted-foreground mr-[25%] text-sm md:text-base mt-1">
        {description}
      </span>
    </div>
  );
}
