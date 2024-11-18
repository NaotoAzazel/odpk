import { useState } from "react";
import { StaticPages } from "@prisma/client";

import { CustomColumnDef } from "@/types/table";
import { redirects } from "@/config/constants";
import { formatDate } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import {
  DeleteButton,
  EditButton,
  LinkToButton,
} from "../../../_components/action-cell/action-buttons";
import { ActionMenu } from "../../../_components/action-cell/action-menu";
import { DeleteDialog } from "../../../_components/delete-dialog";

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

        const linkToPage = `${redirects.toPageItem}/${href}`;
        const editLink = `${redirects.toPageEditor}/${id}`;

        return (
          <>
            <div className="hidden flex-row gap-2 md:flex">
              <LinkToButton href={linkToPage} />
              <EditButton href={editLink} />
              <DeleteButton onClick={() => setIsShowDeleteDialog(true)} />
            </div>

            <DeleteDialog
              title="Ви впевнені що хочете видалити цю сторінку?"
              description="Цю дію не можна буде скасувати."
              endpoint={`/api/pages/${id}`}
              isOpen={isShowDeleteDialog}
              onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
            />

            <ActionMenu
              buttons={[
                { type: "link", href: linkToPage },
                { type: "edit", href: editLink },
                { type: "delete", onClick: () => setIsShowDeleteDialog(true) },
              ]}
              className="flex md:hidden"
            />
          </>
        );
      },
    },
  ];
}
