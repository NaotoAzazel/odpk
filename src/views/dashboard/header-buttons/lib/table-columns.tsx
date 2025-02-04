import { useState } from "react";
import { HeaderButtons } from "@prisma/client";

import { CustomColumnDef, DataTableColumnHeader } from "@/widgets/data-table";
import { ButtonDeleteDialog } from "@/entities/header-button";
import { REDIRECTS } from "@/shared/constants";
import {
  ActionsDropdownMenu,
  DeleteButton,
  NavigateToPageButton,
} from "@/shared/ui";

export function getColumns(): CustomColumnDef<HeaderButtons>[] {
  return [
    {
      id: "#",
      meta: {
        translatedName: "Номер",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="#" />
      ),
      cell: ({ row }) => <span className="w-1">{row.index + 1}</span>,
    },
    {
      accessorKey: "title",
      meta: {
        translatedName: "Назва",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Назва" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "items",
      meta: {
        translatedName: "Елементи",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Елементи" />
      ),
      cell: ({ row }) => {
        const items = row.original.items;
        if (!items.length) {
          return <span>Немає елементів</span>;
        }

        const buttonItemTitles = items.map((item) => item.title);

        return (
          <div className="w-fit">
            <span className="up line-clamp-1 overflow-hidden text-ellipsis whitespace-normal break-words md:line-clamp-2">
              {buttonItemTitles.join(", ")}
            </span>
          </div>
        );
      },
      enableSorting: false,
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
        const id = row.original.id;

        const [isShowDeleteDialog, setIsShowDeleteDialog] =
          useState<boolean>(false);

        const toButtonEdit = `${REDIRECTS.toHeaderButtonEdit}/${row.original.id}`;

        return (
          <>
            <ActionsDropdownMenu
              actionSlot={
                <>
                  <NavigateToPageButton
                    href={toButtonEdit}
                    text="Редагувати"
                    icon="pencil"
                  />
                  <DeleteButton
                    text="Видалити"
                    onClick={() => setIsShowDeleteDialog(true)}
                  />
                </>
              }
            />

            <ButtonDeleteDialog
              id={id}
              isOpen={isShowDeleteDialog}
              onOpenChange={(isShowDeleteDialog) =>
                setIsShowDeleteDialog(isShowDeleteDialog)
              }
            />
          </>
        );
      },
    },
  ];
}
