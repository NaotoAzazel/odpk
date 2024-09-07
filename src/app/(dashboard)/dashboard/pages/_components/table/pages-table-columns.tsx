import { useState } from "react";
import Link from "next/link";
import { StaticPages } from "@prisma/client";

import { CustomColumnDef } from "@/types/table";
import { formatDate } from "@/lib/utils";
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

        return (
          <>
            <div className="hidden flex-row gap-2 md:flex">
              <LinkTo href={`/content-temp/${href}`} />
              <EditButton href={`/page-editor/${id}`} />
              <DeleteButton onClick={() => setIsShowDeleteDialog(true)} />
            </div>

            <DeleteDialog
              title="Ви впевнені що хочете видалити цю сторінку?"
              description="Цю дію не можна буде скасувати."
              endpoint={`/api/pages/${id}`}
              isOpen={isShowDeleteDialog}
              onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
            />

            {/* TODO: refactor this menu below */}
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
                    href={`/content-temp/${href}`}
                    className="flex flex-row items-center hover:cursor-default"
                  >
                    <Icons.openLink className="mr-2 h-4 w-4" />
                    <span>Відкрити</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`/page-editor/${id}`}
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
