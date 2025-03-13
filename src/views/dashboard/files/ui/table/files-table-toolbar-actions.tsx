"use client";

import Link from "next/link";

import { cn } from "@/shared/lib";
import { buttonVariants, Icons, Input } from "@/shared/ui";

interface FilesTableToolbarActionsProps {
  value: string;
  setValue: (value: string) => void;
}

export function FilesTableToolbarActions({
  value,
  setValue,
}: FilesTableToolbarActionsProps) {
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
        <Link
          href="/dashboard/files/upload"
          className={buttonVariants({ variant: "outline" })}
        >
          <Icons.plus className="mr-2 h-4 w-4" />
          Файл
        </Link>
      </div>
    </div>
  );
}
