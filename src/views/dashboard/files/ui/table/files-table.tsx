"use client";

import { use, useMemo } from "react";

import {
  DataTable,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import { getFiles } from "@/entities/file";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
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
    initialPageSize: ROWS_PER_PAGE,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <FilesTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
