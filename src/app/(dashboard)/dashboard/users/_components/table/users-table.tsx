"use client";
"use memo";

import { use, useMemo } from "react";

import { paginationConfig } from "@/config/pagination";
import { getUsers } from "@/lib/actions/users";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { getColumns } from "./users-table-columns";
import { UsersTableToolbarActions } from "./users-table-toolbar-actions";

interface UsersTableProps {
  usersPromise: ReturnType<typeof getUsers>;
}

export function UsersTable({ usersPromise }: UsersTableProps) {
  const users = use(usersPromise);
  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: users,
    columns,
    initialPageSize: paginationConfig.dashboard.users.rowsPerPage,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <UsersTableToolbarActions />
      </DataTableToolbar>
    </DataTable>
  );
}
