import { BasicCard } from "@/shared/model";

export function PriorityCard({ content }: { content: BasicCard }) {
  const { title, description } = content;

  return (
    <div className="flex h-full flex-col rounded-md border bg-white p-4 text-gray-800 md:p-5">
      <span className="font-heading text-xl font-bold tracking-tighter md:text-2xl">
        {title}
      </span>
      <span className="mr-[25%] mt-1 text-sm text-muted-foreground md:text-base">
        {description}
      </span>
    </div>
  );
}
