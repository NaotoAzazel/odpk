"use client";

import type { Table } from "@tanstack/react-table";

import { cn } from "@/shared/lib";

import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between space-x-2",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
