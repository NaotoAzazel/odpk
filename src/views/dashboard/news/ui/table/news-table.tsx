"use client";
"use memo";

import { use, useMemo } from "react";

import {
  DataTable,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import { getNews } from "@/entities/news";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
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
    initialPageSize: ROWS_PER_PAGE,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <NewsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
