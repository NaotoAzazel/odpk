import { cn } from "@/lib/utils";

interface LeftLobbyHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
}

export function LeftLobbyHeader({
  heading,
  text,
  className,
  children,
}: LeftLobbyHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="grid gap-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
          {heading}
        </h2>
        {text && (
          <p className="text-base lg:text-lg text-muted-foreground">{text}</p>
        )}
      </div>
      {children}
    </div>
  );
}
