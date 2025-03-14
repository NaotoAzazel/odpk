import { useState } from "react";
import { StaticPages } from "@prisma/client";

import { CustomColumnDef, DataTableColumnHeader } from "@/widgets/data-table";
import { PageDeleteDiloag } from "@/entities/page";
import { REDIRECTS } from "@/shared/constants";
import { formatDate } from "@/shared/lib";
import {
  ActionsDropdownMenu,
  DeleteButton,
  NavigateToPageButton,
} from "@/shared/ui";

export function getColumns(): CustomColumnDef<StaticPages>[] {
  return [
    {
      accessorKey: "title",
      meta: {
        translatedName: "Заголовок",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Заголовок" />
      ),
      cell: ({ row }) => {
        const title = row.original.title as string;

        return (
          <div className="max-w-52 lg:max-w-64">
            <h1
              title={title}
              className="line-clamp-2 overflow-hidden text-ellipsis whitespace-normal break-words"
            >
              {title}
            </h1>
          </div>
        );
      },
    },
    {
      accessorKey: "href",
      meta: {
        translatedName: "Посилання",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Посилання" />
      ),
      cell: ({ row }) => {
        const href = row.original.href;

        return (
          <div className="max-w-52 lg:max-w-64">
            <p
              title={href}
              className="line-clamp-2 overflow-hidden text-ellipsis whitespace-normal break-words"
            >
              {href}
            </p>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      meta: {
        translatedName: "Дата створення",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Дата створення" />
      ),
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return <span>{formatDate(date, { month: "long" })}</span>;
      },
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
        const href = row.original.href;
        const id = row.original.id;

        const [isShowDeleteDialog, setIsShowDeleteDialog] =
          useState<boolean>(false);

        const linkToPage = `${REDIRECTS.toPageItem}/${href}`;
        const editLink = `${REDIRECTS.toPageEditor}/${id}`;

        return (
          <>
            <ActionsDropdownMenu
              actionSlot={
                <>
                  <NavigateToPageButton
                    href={linkToPage}
                    text="Відкрити"
                    icon="openLink"
                  />
                  <NavigateToPageButton
                    href={editLink}
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

            <PageDeleteDiloag
              id={id}
              isOpen={isShowDeleteDialog}
              onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
            />
          </>
        );
      },
    },
  ];
}
