"use client";

import { HeaderButtons } from "@prisma/client";
import { type Table } from "@tanstack/react-table";

import { DataTableInputSearch } from "@/widgets/data-table";
import { ButtonCreateDialog } from "@/entities/header-button";

interface HeaderButtonsTableToolbarActionsProps {
  table: Table<HeaderButtons>;
}

export function HeaderButtonsTableToolbarActions({
  table,
}: HeaderButtonsTableToolbarActionsProps) {
  return (
    <div className="flex w-full items-center justify-center space-x-2 overflow-auto">
      <div className="flex flex-1 items-center">
        <DataTableInputSearch table={table} searchByColumnName="title" />
      </div>
      <div className="flex items-center gap-2">
        <ButtonCreateDialog />
      </div>
    </div>
  );
}
