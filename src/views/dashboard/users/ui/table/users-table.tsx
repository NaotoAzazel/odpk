"use client";
"use memo";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DataTable,
  DataTableSkeleton,
  DataTableToolbar,
  useDataTable,
} from "@/widgets/data-table";
import { getUsers, USER_QUERY_BASE_KEY } from "@/entities/user";
import { ErrorContainer } from "@/shared/ui";

import { ROWS_PER_PAGE } from "../../constants";
import { getColumns } from "../../lib";
import { UsersTableToolbarActions } from "./users-table-toolbar-actions";

interface UsersTableProps {
  page: number;
}

export function UsersTable({ page }: UsersTableProps) {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [USER_QUERY_BASE_KEY, "all"],
    queryFn: () => getUsers(),
  });

  const columns = useMemo(() => getColumns(), []);

  const { table } = useDataTable({
    data: users ?? [],
    columns,
    initialPageSize: ROWS_PER_PAGE,
    currentPage: page,
  });

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={5}
        searchableColumnCount={1}
        filterableColumnCount={1}
        cellWidths={["4rem", "20rem", "10rem", "10rem", "5rem"]}
        shrinkZero
      />
    );
  }

  if (isError) {
    return <ErrorContainer title="Виникла помилка з отриманням сторінок" />;
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <UsersTableToolbarActions />
      </DataTableToolbar>
    </DataTable>
  );
}
