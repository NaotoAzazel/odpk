"use client";
"use memo";

import { use, useMemo } from "react";

import { paginationConfig } from "@/config/pagination";
import { getPages } from "@/lib/actions/pages";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { getColumns } from "./pages-table-columns";
import { PageTableToolbarActions } from "./pages-table-toolbar-actions";

interface PagesTableProps {
  pagesPromise: ReturnType<typeof getPages>;
}

export function PagesTable({ pagesPromise }: PagesTableProps) {
  const pages = use(pagesPromise);
  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: pages,
    columns,
    initialPageSize: paginationConfig.dashboard.pages.rowsPerPage,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <PageTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
