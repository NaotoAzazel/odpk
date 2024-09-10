import { cn } from "@/lib/utils";

interface NavErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function NavError({
  className,
  text = "Виникла помилка під час завантаження кнопок",
  ...props
}: NavErrorProps) {
  return (
    <div
      className={cn(
        "flex w-full rounded-lg border border-red-300 bg-red-600 bg-opacity-25 p-2 px-4 md:ml-4 lg:ml-8",
        className,
      )}
      {...props}
    >
      <h2 className="text-heading text-sm font-medium text-red-950">{text}</h2>
    </div>
  );
}
