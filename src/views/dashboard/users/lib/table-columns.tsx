import { useState } from "react";
import { Users } from "@prisma/client";

import { CustomColumnDef, DataTableColumnHeader } from "@/widgets/data-table";
import { UserDeleteDialog } from "@/entities/user";
import { DeleteButton } from "@/shared/ui";

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
            <UserDeleteDialog
              id={row.original.id}
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
