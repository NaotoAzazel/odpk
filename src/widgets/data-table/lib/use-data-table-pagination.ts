"use client";

import { useEffect } from "react";
import { Table } from "@tanstack/react-table";

import { usePagination } from "@/shared/lib";

export function useDataTablePagination<TData>(table: Table<TData>) {
  const { handleNextPage, handlePrevPage, setCurrentPage } = usePagination({
    page: table.getState().pagination.pageIndex + 1,
  });

  useEffect(() => {
    const totalPagesCount = table.getPageCount();
    const pageIndex = table.getState().pagination.pageIndex + 1;

    if (totalPagesCount === 0) return;

    if (pageIndex > totalPagesCount) {
      setCurrentPage(table.getPageCount().toString());
    }
  }, [table, setCurrentPage, handleNextPage, handlePrevPage]);

  return { handleNextPage, handlePrevPage };
}
