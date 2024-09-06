"use client";

import { Post } from "@/types";
import { type Table } from "@tanstack/react-table";

import { TableInputSearch } from "../../../_components/table/table-input-search";
import { NewsCreateButton } from "../news-create-button";

interface NewsTableToolbarActionsProps {
  table: Table<Post>;
}

export function NewsTableToolbarActions({
  table,
}: NewsTableToolbarActionsProps) {
  return (
    <div className="flex w-full items-center justify-center space-x-2 overflow-auto">
      <div className="flex flex-1 items-center">
        <TableInputSearch table={table} searchByColumnName="title" />
      </div>
      <div className="flex items-center gap-2">
        <NewsCreateButton className="ring-offset-0 focus:outline-none" />
      </div>
    </div>
  );
}
