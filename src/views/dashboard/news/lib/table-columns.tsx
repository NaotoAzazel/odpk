"use client";

import { useState } from "react";
import { Post } from "@prisma/client";

import { CustomColumnDef, DataTableColumnHeader } from "@/widgets/data-table";
import { REDIRECTS } from "@/shared/constants";
import { cn, formatDate } from "@/shared/lib";
import {
  ActionMenu,
  DeleteButton,
  DeleteDialog,
  EditButton,
  LinkToButton,
} from "@/shared/ui";

export function getColumns(): CustomColumnDef<Post>[] {
  return [
    {
      accessorKey: "id",
      meta: {
        translatedName: "Id",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
      cell: ({ row }) => <div className="w-1">{row.original.id}</div>,
      enableSorting: false,
    },
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
      accessorKey: "published",
      meta: {
        translatedName: "Статус",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Статус" />
      ),
      cell: ({ row }) => {
        const isPublished = row.original.published;

        return (
          <div
            className={cn(
              "max-w-fit rounded-lg bg-opacity-25",
              isPublished ? "bg-green-600" : "bg-blue-600",
            )}
          >
            <span
              className={cn(
                "flex flex-row items-center justify-center gap-1 px-3 py-2 text-xs font-medium lg:gap-2 lg:text-sm",
                isPublished ? "text-green-950" : "text-blue-950",
              )}
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full opacity-70",
                  isPublished ? "bg-green-700" : "bg-blue-700",
                )}
              />
              {isPublished ? "Опубліковано" : "Публікується"}
            </span>
          </div>
        );
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
        const id = row.original.id;

        const [isShowDeleteDialog, setIsShowDeleteDialog] =
          useState<boolean>(false);

        const linkToNewsItem = `${REDIRECTS.toNewsItem}/${id}`;
        const editLink = `${REDIRECTS.toNewsEditor}/${id}`;

        return (
          <>
            <div className="hidden flex-row gap-2 md:flex">
              <LinkToButton href={linkToNewsItem} />
              <EditButton href={editLink} />
              <DeleteButton onClick={() => setIsShowDeleteDialog(true)} />
            </div>

            <DeleteDialog
              title="Ви впевнені що хочете видалити цю новину?"
              description="Цю дію не можна буде скасувати."
              endpoint={`/api/news/${id}`}
              isOpen={isShowDeleteDialog}
              onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
            />

            <ActionMenu
              buttons={[
                { type: "link", href: linkToNewsItem },
                { type: "edit", href: editLink },
                {
                  type: "delete",
                  onClick: () => setIsShowDeleteDialog(true),
                },
              ]}
              className="flex md:hidden"
            />
          </>
        );
      },
    },
  ];
}
