import { cn } from "@/shared/lib";

interface CardsHolderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardsHolder({
  className,
  children,
  ...props
}: CardsHolderProps) {
  return (
    <div
      className={cn("mx-auto grid justify-center gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
