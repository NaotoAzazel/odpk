"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

interface UseDatatTableProps<TData, TValue> {
  /**
   * The data for the table.
   * @default []
   * @type TData[]
   */
  data: TData[];

  /**
   * The columns of the table.
   * @default []
   * @type ColumnDef<TData, TValue>[]
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * @default 1
   * @type number
   */
  pageCount?: number;

  /**
   * @default 1
   * @type number
   */
  currentPage?: number;

  initialPageSize?: number;

  manualPagination?: boolean;
  manualFiltering?: boolean;
}

export function useDataTable<TData, TValue>({
  data,
  columns,
  pageCount = 1,
  currentPage = 1,
  initialPageSize = 10,
  manualPagination = false,
  manualFiltering = false,
}: UseDatatTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const pagination: PaginationState = {
    pageIndex: currentPage - 1,
    pageSize: initialPageSize,
  };

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination,
    manualFiltering,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  });

  return { table };
}
