import { Card } from "@/types";

export function StatsCard({ content }: { content: Card }) {
  const { title, description } = content;

  return (
    <div className="flex flex-col items-start h-full min-h-24 border border-slate-500 rounded-lg px-5 pb-5 pt-4">
      <span className="font-heading tracking-tighter text-xl md:text-2xl font-bold">
        {title}
      </span>
      <p className="text-gray-300 text-sm md:text-base mt-1">
        {description}
      </p>
    </div>
  );
}
