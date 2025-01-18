"use client";

import { type Table } from "@tanstack/react-table";

import { Button } from "@/shared/ui";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    scrollToTop();
    table.previousPage();
  };

  const handleNextPage = () => {
    scrollToTop();
    table.nextPage();
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePreviousPage}
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
    </>
  );
}
