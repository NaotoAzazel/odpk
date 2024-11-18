"use client";
"use memo";

import { use, useMemo } from "react";

import { paginationConfig } from "@/config/pagination";
import { getNews } from "@/lib/actions/news";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { getColumns } from "./news-table-columns";
import { NewsTableToolbarActions } from "./news-table-toolbar-actions";

interface NewsTableProps {
  newsPromise: ReturnType<typeof getNews>;
}

export function NewsTable({ newsPromise }: NewsTableProps) {
  const news = use(newsPromise);
  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: news,
    columns,
    initialPageSize: paginationConfig.dashboard.news.rowsPerPage,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <NewsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
