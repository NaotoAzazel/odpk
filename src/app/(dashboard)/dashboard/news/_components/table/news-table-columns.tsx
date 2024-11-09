"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@prisma/client";

import { CustomColumnDef } from "@/types/table";
import { redirects } from "@/config/constants";
import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Icons } from "@/components/icons";

import { DeleteButton } from "../../../_components/action-cell/delete-button";
import { EditButton } from "../../../_components/action-cell/edit-button";
import { LinkTo } from "../../../_components/action-cell/link-to-button";
import { DeleteDialog } from "../../../_components/delete-dialog";

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

        const linkToNewsItem = `${redirects.toNewsItem}/${id}`;
        const editLink = `${redirects.toNewsEditor}/${id}`;

        return (
          <>
            <div className="hidden flex-row gap-2 md:flex">
              <LinkTo href={linkToNewsItem} />
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="flex md:hidden">
                <Button variant="outline" className="h-8 w-8 p-0">
                  <span className="sr-only">Відкрити меню</span>
                  <Icons.alignJustify className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href={linkToNewsItem}
                    className="flex flex-row items-center hover:cursor-default"
                  >
                    <Icons.openLink className="mr-2 h-4 w-4" />
                    <span>Відкрити</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={editLink}
                    className="flex flex-row items-center hover:cursor-default"
                  >
                    <Icons.pencil className="mr-2 h-4 w-4" />
                    <span>Редагувати</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Icons.trash className="mr-2 h-4 w-4" />
                  <span>Видалити</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
