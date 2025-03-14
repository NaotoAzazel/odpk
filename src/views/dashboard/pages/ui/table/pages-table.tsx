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
  getPagesForPagination,
  PAGE_PAGINATION_KEY,
  PAGE_QUERY_BASE_KEY,
} from "@/entities/page";
import { useDebounce } from "@/shared/lib";
import { ErrorContainer } from "@/shared/ui";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
import { PageTableToolbarActions } from "./pages-table-toolbar-actions";

interface PagesTableProps {
  page: number;
}

export function PagesTable({ page }: PagesTableProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 1_000);

  const {
    data: pages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [PAGE_QUERY_BASE_KEY, PAGE_PAGINATION_KEY, page, debouncedSearch],
    queryFn: () =>
      getPagesForPagination({
        page,
        itemsPerPage: ROWS_PER_PAGE,
        title: debouncedSearch,
        sortByCreatedAt: "asc",
      }),
  });

  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: pages?.data ?? [],
    columns,
    initialPageSize: ROWS_PER_PAGE,
    currentPage: page,
    pageCount: pages?.metadata.totalPages,
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
    return <ErrorContainer title="Виникла помилка з отриманням сторінок" />;
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <PageTableToolbarActions
          value={searchInput}
          setValue={setSearchInput}
        />
      </DataTableToolbar>
    </DataTable>
  );
}
