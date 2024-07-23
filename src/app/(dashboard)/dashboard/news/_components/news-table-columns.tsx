"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { DeleteNewsDialog } from "./news-delete-dialog";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

import { Post } from "@/types";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { useState } from "react";


export function getColumns(): ColumnDef<Post>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
      cell: ({ row }) => <div className="w-1">{row.getValue("id")}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Заголовок" />
      ),
      cell: ({ row }) => {
        const title = row.original.title as string;

        return (
          <div className="max-w-52 lg:max-w-64">
            <h1 className="overflow-hidden whitespace-normal break-words text-ellipsis line-clamp-2">
              {title}
            </h1>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Дата створення" />
      ),
      cell: ({ row }) => {
        const date = row.original.createdAt;
        const formatted = date.toLocaleDateString("uk-UA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return <span>{formatted}</span>;
      },
    },
    {
      accessorKey: "published",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Статус" />
      ),
      cell: ({ row }) => {
        const isPublished = row.getValue("published");

        return (
          <div
            className={cn(
              "rounded-lg bg-opacity-25 max-w-fit",
              isPublished ? "bg-green-600" : "bg-blue-600"
            )}
          >
            <span
              className={cn(
                "font-medium text-xs lg:text-sm py-2 px-3 flex flex-row gap-1 lg:gap-2 items-center justify-center",
                isPublished ? "text-green-950" : "text-blue-950"
              )}
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full opacity-70",
                  isPublished ? "bg-green-700" : "bg-blue-700"
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Дії" />
      ),
      cell: function Cell({ row }) {
        const currentNewsId = row.getValue("id") as number;
        const [isShowDeleteDialog, setIsShowDeleteDialog] =
          useState<boolean>(false);

        return (
          <>
            <div className="hidden md:flex flex-row gap-2">
              <Link
                href={`/news/${currentNewsId}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-8 h-8 p-0"
                )}
              >
                <Icons.openLink className="h-4 w-4" />
              </Link>
              <Link
                href={`/editor/${currentNewsId}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-8 h-8 p-0"
                )}
              >
                <Icons.pencil className="h-4 w-4" />
              </Link>
              <Button
                variant="outline"
                className="w-8 h-8 p-0 bg-red-600 focus:ring-red-600 hover:bg-red-700 text-white hover:text-muted"
                onClick={() => setIsShowDeleteDialog(true)}
              >
                <Icons.trash className="h-4 w-4" />
              </Button>
            </div>

            <DeleteNewsDialog
              isOpen={isShowDeleteDialog}
              setIsOpen={setIsShowDeleteDialog}
              selectedNewsId={currentNewsId}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="flex md:hidden">
                <Button variant="outline" className="w-8 h-8 p-0">
                  <span className="sr-only">Відкрити меню</span>
                  <Icons.alignJustify className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href={`/news/${currentNewsId}`}
                    className="hover:cursor-default flex flex-row items-center"
                  >
                    <Icons.openLink className="mr-2 w-4 h-4" />
                    <span>Відкрити</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`/editor/${currentNewsId}`}
                    className="hover:cursor-default flex flex-row items-center"
                  >
                    <Icons.pencil className="mr-2 w-4 h-4" />
                    <span>Редагувати</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Icons.trash className="mr-2 w-4 h-4" />
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
