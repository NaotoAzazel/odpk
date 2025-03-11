"use client";

import { type Table } from "@tanstack/react-table";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

import { useDataTablePagination } from "../lib";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { handleNextPage, handlePrevPage } = useDataTablePagination(table);

  const pageCount = table.getPageCount();
  let customClass = pageCount > 0 ? "justify-between gap-4" : "justify-end";

  return (
    <div className={cn("flex w-full flex-col sm:flex-row", customClass)}>
      {pageCount > 0 && (
        <div className="flex items-center justify-center text-sm font-medium">
          Сторінка {table.getState().pagination.pageIndex + 1} з{" "}
          {table.getPageCount()}
        </div>
      )}

      <div className="flex flex-row justify-center gap-2 md:justify-normal">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={!table.getCanPreviousPage()}
        >
          Попередня
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
        >
          Наступна
        </Button>
      </div>
    </div>
  );
}
