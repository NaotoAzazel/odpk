"use client";
"use memo";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DataTable,
  DataTableSkeleton,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import { getNews, NEWS_QUERY_BASE_KEY } from "@/entities/news";
import { ErrorContainer } from "@/shared/ui";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
import { NewsTableToolbarActions } from "./news-table-toolbar-actions";

export function NewsTable() {
  const {
    data: news,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [NEWS_QUERY_BASE_KEY, "all"],
    queryFn: () => getNews(),
  });

  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: news ?? [],
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
        <NewsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
