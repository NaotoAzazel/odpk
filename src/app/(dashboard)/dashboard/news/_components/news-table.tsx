"use client";
"use memo";

import { use, useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";

import { getNews } from "@/lib/actions/news";

import { getColumns } from "./news-table-columns";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
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
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <NewsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
