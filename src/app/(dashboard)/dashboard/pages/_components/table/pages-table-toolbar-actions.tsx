"use client";

import { StaticPages } from "@prisma/client";
import { type Table } from "@tanstack/react-table";

import { TableInputSearch } from "../../../_components/table/table-input-search";
import { PageCreateButton } from "../page-create-button";

interface PageTableToolbarActionsProps {
  table: Table<StaticPages>;
}

export function PageTableToolbarActions({
  table,
}: PageTableToolbarActionsProps) {
  return (
    <div className="flex w-full items-center justify-center space-x-2 overflow-auto">
      <div className="flex flex-1 items-center">
        <TableInputSearch table={table} searchByColumnName="title" />
      </div>
      <div className="flex items-center gap-2">
        <PageCreateButton className="ring-offset-0 focus:outline-none" />
      </div>
    </div>
  );
}
