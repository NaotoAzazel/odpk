"use client";
"use memo";

import { use, useMemo } from "react";

import { getPagesByParams } from "@/lib/actions/pages";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { PageTableToolbarActions } from "./pages-table-toolbar-actions";
import { getColumns } from "./pages-table-columns";

interface PagesTableProps {
  pagesPromise: ReturnType<typeof getPagesByParams>;
}

export function PagesTable({ pagesPromise }: PagesTableProps) {
  const pages = use(pagesPromise);
  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: pages,
    columns,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <PageTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
