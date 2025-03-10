"use client";

import { useEffect } from "react";
import { Table } from "@tanstack/react-table";

import { usePagination } from "@/shared/lib";

export function useDataTablePagination<TData>(table: Table<TData>) {
  const { handleNextPage, handlePrevPage, setCurrentPage } = usePagination({
    page: table.getState().pagination.pageIndex + 1,
  });

  useEffect(() => {
    if (table.getRowModel().rows.length === 0) {
      setCurrentPage(table.getPageCount().toString());
    }
  }, [table, setCurrentPage, handleNextPage, handlePrevPage]);

  return { handleNextPage, handlePrevPage };
}
