import { useState } from "react";
import { Users } from "@prisma/client";

import { CustomColumnDef } from "@/types/table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { DeleteButton } from "../../../_components/action-cell/action-buttons";
import { DeleteDialog } from "../../../_components/delete-dialog";

export function getColumns(): CustomColumnDef<Users>[] {
  return [
    {
      accessorKey: "id",
      meta: {
        translatedName: "Id",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "email",
      meta: {
        translatedName: "Пошта",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Пошта" />
      ),
    },
    {
      id: "actions",
      meta: {
        translatedName: "Дії",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Дії" />
      ),
      cell: function Cell({ row }) {
        const [isShowDeleteDialog, setIsShowDeleteDialog] =
          useState<boolean>(false);

        return (
          <>
            <DeleteDialog
              title="Ви впевнені що хочете видалити користувача?"
              description="Цю дію не можна буде скасувати."
              endpoint={`/api/users/${row.original.id}`}
              isOpen={isShowDeleteDialog}
              onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
            />
            <DeleteButton onClick={() => setIsShowDeleteDialog(true)} />
          </>
        );
      },
    },
  ];
}
