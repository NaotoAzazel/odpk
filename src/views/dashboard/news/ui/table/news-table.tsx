"use client";
"use memo";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DataTable,
  DataTableSkeleton,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import {
  getNewsForPagination,
  NEWS_PAGINATION_KEY,
  NEWS_QUERY_BASE_KEY,
} from "@/entities/news";
import { useDebounce } from "@/shared/lib";
import { ErrorContainer } from "@/shared/ui";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
import { NewsTableToolbarActions } from "./news-table-toolbar-actions";

interface NewsTableProps {
  page: number;
}

export function NewsTable({ page }: NewsTableProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 1_000);

  const {
    data: news,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [NEWS_QUERY_BASE_KEY, NEWS_PAGINATION_KEY, page, debouncedSearch],
    queryFn: () =>
      getNewsForPagination({
        page,
        itemsPerPage: ROWS_PER_PAGE,
        title: debouncedSearch,
        sortByCreatedAt: "asc",
      }),
  });

  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: news?.data ?? [],
    columns,
    initialPageSize: ROWS_PER_PAGE,
    currentPage: page,
    pageCount: news?.metadata.totalPages,
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
    return (
      <ErrorContainer
        title="Виникла помилка з отримання новин"
        description="Ми вже працює над виправленням цієї помилки"
      />
    );
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <NewsTableToolbarActions
          value={searchInput}
          setValue={setSearchInput}
        />
      </DataTableToolbar>
    </DataTable>
  );
}
