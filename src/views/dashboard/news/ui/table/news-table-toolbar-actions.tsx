"use client";

import { Post } from "@prisma/client";
import { type Table } from "@tanstack/react-table";

import { DataTableInputSearch } from "@/widgets/data-table";
import { NewsCreateButton } from "@/entities/news";

interface NewsTableToolbarActionsProps {
  table: Table<Post>;
}

export function NewsTableToolbarActions({
  table,
}: NewsTableToolbarActionsProps) {
  return (
    <div className="flex w-full items-center justify-center space-x-2 overflow-auto">
      <div className="flex flex-1 items-center">
        <DataTableInputSearch table={table} searchByColumnName="title" />
      </div>
      <div className="flex items-center gap-2">
        <NewsCreateButton className="ring-offset-0 focus:outline-none" />
      </div>
    </div>
  );
}
