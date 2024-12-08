"use client";

import { use, useMemo } from "react";

import { paginationConfig } from "@/config/pagination";
import { getFiles } from "@/lib/files/actions";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { getColumns } from "./files-table-columns";
import { FilesTableToolbarActions } from "./files-table-toolbar-actions";

interface FilesTableProps {
  filesPromise: ReturnType<typeof getFiles>;
}

export function FilesTable({ filesPromise }: FilesTableProps) {
  const files = use(filesPromise);
  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: files,
    columns,
    initialPageSize: paginationConfig.dashboard.files.rowsPerPage,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <FilesTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
