"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DataTable,
  DataTableSkeleton,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import { FILES_QUERY_BASE_KEY, getFiles } from "@/entities/file";
import { ErrorContainer } from "@/shared/ui";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
import { FilesTableToolbarActions } from "./files-table-toolbar-actions";

interface FilesTableProps {
  page: number;
}

export function FilesTable({ page }: FilesTableProps) {
  const {
    data: files,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [FILES_QUERY_BASE_KEY, "all"],
    queryFn: () => getFiles(),
  });

  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: files ?? [],
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
    return <ErrorContainer title="Виникла помилка з отриманням файлів" />;
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <FilesTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
