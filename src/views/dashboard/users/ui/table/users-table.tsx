"use client";
"use memo";

import { use, useMemo } from "react";

import {
  DataTable,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import { getUsers } from "@/entities/user";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
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
    initialPageSize: ROWS_PER_PAGE,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <UsersTableToolbarActions />
      </DataTableToolbar>
    </DataTable>
  );
}
