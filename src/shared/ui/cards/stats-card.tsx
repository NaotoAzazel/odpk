import { BasicCard } from "@/shared/model";

export function StatsCard({ content }: { content: BasicCard }) {
  const { title, description } = content;

  return (
    <div className="flex h-full min-h-24 flex-col items-start rounded-md border border-slate-500 px-5 pb-5 pt-4">
      <span className="font-heading text-xl font-bold tracking-tighter md:text-2xl">
        {title}
      </span>
      <p className="mt-1 text-sm text-gray-300 md:text-base">{description}</p>
    </div>
  );
}
