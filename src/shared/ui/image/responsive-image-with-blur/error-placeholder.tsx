"use client";

import { cn } from "@/shared/lib";
import { Icons } from "@/shared/ui";

interface ErrorPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  smallSize: boolean;
}

export function ErrorPlaceholder({
  className,
  smallSize,
}: ErrorPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center rounded-md bg-muted",
        className,
      )}
    >
      <Icons.imageError
        className={cn("text-muted-foreground", smallSize ? "size-7" : "size-9")}
        strokeWidth={1.5}
      />
    </div>
  );
}
