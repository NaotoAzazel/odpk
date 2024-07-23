"use client";

import { Post } from "@/types";
import { type Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { NewsCreateButton } from "./news-create-button";

interface NewsTableToolbarActionsProps {
  table: Table<Post>;
}

export function NewsTableToolbarActions({
  table,
}: NewsTableToolbarActionsProps) {
  return (
    <div className="flex w-full items-center justify-center overflow-auto space-x-2">
      <div className="flex flex-1 items-center">
        <Input
          placeholder="Введіть заголовок..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm focus-visible:ring-0"
        />
      </div>
      <div className="flex items-center gap-2">
        <NewsCreateButton className="focus:outline-none ring-offset-0" />
      </div>
    </div>
  );
}
