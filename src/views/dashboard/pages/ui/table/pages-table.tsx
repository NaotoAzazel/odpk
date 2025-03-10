"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DataTable,
  DataTableSkeleton,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import { getPages, PAGE_QUERY_BASE_KEY } from "@/entities/page";
import { ErrorContainer } from "@/shared/ui";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
import { PageTableToolbarActions } from "./pages-table-toolbar-actions";

interface PagesTableProps {
  page: number;
}

export function PagesTable({ page }: PagesTableProps) {
  const {
    data: pages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [PAGE_QUERY_BASE_KEY, "all"],
    queryFn: () => getPages(),
  });

  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: pages ?? [],
    columns,
    initialPageSize: ROWS_PER_PAGE,
    currentPage: page,
  });

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={5}
        searchableColumnCount={1}
        filterableColumnCount={1}
        cellWidths={["4rem", "20rem", "10rem", "10rem", "5rem"]}
        shrinkZero
      />
    );
  }

  if (isError) {
    return <ErrorContainer title="Виникла помилка з отриманням сторінок" />;
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <PageTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
