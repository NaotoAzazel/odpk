"use client";

import { NewsCreateButton } from "@/entities/news";
import { cn } from "@/shared/lib";
import { Input } from "@/shared/ui";

interface NewsTableToolbarActionsProps {
  value: string;
  setValue: (value: string) => void;
}

export function NewsTableToolbarActions({
  value,
  setValue,
}: NewsTableToolbarActionsProps) {
  return (
    <div className="flex w-full items-center justify-center space-x-2 overflow-auto">
      <div className="flex flex-1 items-center">
        <Input
          placeholder="Введіть заголовок..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={cn("max-w-sm focus-visible:ring-0")}
        />
      </div>
      <div className="flex items-center gap-2">
        <NewsCreateButton className="ring-offset-0 focus:outline-none" />
      </div>
    </div>
  );
}
