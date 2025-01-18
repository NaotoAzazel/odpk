"use client";
"use memo";

import { use, useMemo } from "react";

import {
  DataTable,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import { getPages } from "@/entities/page";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
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
    initialPageSize: ROWS_PER_PAGE,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <PageTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
