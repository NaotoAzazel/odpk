"use client";

import { cn } from "@/shared/lib";
import { Button, ButtonProps, Icons } from "@/shared/ui";

interface DeleteButtonProps extends ButtonProps {
  text?: string;
}

export function DeleteButton({ text, onClick }: DeleteButtonProps) {
  const iconMargin = text ? "mr-2" : "mr-0";

  return (
    <Button
      variant={text ? "ghost" : "outline"}
      className="h-8 justify-start p-0 px-2 py-1.5 text-destructive hover:text-destructive"
      onClick={onClick}
    >
      <Icons.trash className={cn(iconMargin, "size-4")} />
      <span className="block">{text}</span>
    </Button>
  );
}
