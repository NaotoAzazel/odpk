"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DataTable,
  DataTableSkeleton,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import {
  FILE_PAGINATION_KEY,
  FILES_QUERY_BASE_KEY,
  getFiles,
  getFilesForPagination,
} from "@/entities/file";
import { useDebounce } from "@/shared/lib";
import { ErrorContainer } from "@/shared/ui";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
import { FilesTableToolbarActions } from "./files-table-toolbar-actions";

interface FilesTableProps {
  page: number;
}

export function FilesTable({ page }: FilesTableProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 1_000);

  const {
    data: files,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [
      FILES_QUERY_BASE_KEY,
      FILE_PAGINATION_KEY,
      page,
      debouncedSearch,
    ],
    queryFn: () =>
      getFilesForPagination({
        page,
        itemsPerPage: ROWS_PER_PAGE,
        title: debouncedSearch,
        sortByCreatedAt: "asc",
      }),
  });

  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: files?.data ?? [],
    columns,
    initialPageSize: ROWS_PER_PAGE,
    currentPage: page,
    pageCount: files?.metadata.totalPages,
    manualFiltering: true,
    manualPagination: true,
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
        <FilesTableToolbarActions
          value={searchInput}
          setValue={setSearchInput}
        />
      </DataTableToolbar>
    </DataTable>
  );
}
