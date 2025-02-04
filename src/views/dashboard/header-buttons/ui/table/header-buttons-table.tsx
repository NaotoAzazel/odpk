"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DataTable,
  DataTableSkeleton,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import {
  getHeaderButtons,
  HEADER_BUTTONS_QUERY_BASE_KEY,
} from "@/entities/header-button";
import { ErrorContainer } from "@/shared/ui";

import { getColumns, ROWS_PER_PAGE } from "../../lib";
import { HeaderButtonsTableToolbarActions } from "./header-buttons-table-toolbar-actions";

export function HeaderButtonsTable() {
  const { data, isError, isLoading } = useQuery({
    queryKey: [HEADER_BUTTONS_QUERY_BASE_KEY, "all"],
    queryFn: () => getHeaderButtons(),
  });

  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: data ?? [],
    columns,
    initialPageSize: ROWS_PER_PAGE,
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
    return <ErrorContainer title="Виникла помилка з отриманням кнопок" />;
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <HeaderButtonsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
