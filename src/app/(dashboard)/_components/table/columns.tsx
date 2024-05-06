"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

import { Picture } from "@/components/picture";
import { Icons } from "@/components/icons";
import { DeleteNewsDialog } from "../news-delete-dialog";

import { useState } from "react";
import Link from "next/link";

import { Prisma } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import { Row } from "@tanstack/react-table";

export type Item = {
  id: number;
  title: string;
  images: string[];
  content: Prisma.JsonValue;
  createdAt: Date;
};

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "image",
    header: () => <span className="hidden md:flex">Зображення</span>,
    cell: ({ row }) => {
      const image = row.original.images[0] ?? "";

      return (
        <div className="flex-col hidden md:flex">
          <div className="relative pb-32 flex inset-0">
            <div className="flex w-full h-full absolute">
              <Picture src={image} className="object-cover" />
            </div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Заголовок
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const currentNewsId = row.original.id;
      const rowText = row.getValue("title") as string;

      return (
        <Link 
          href={`/news/${currentNewsId}`}
          className="font-semibold hover:underline"
        >
          {rowText}
        </Link>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden sm:flex"
        >
          Дата створення
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      const formatted = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",

      });

      return <span className="hidden sm:flex">{formatted}</span>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />
  }
];

const ActionCell = ({ row }: { row: Row<Item> }) => {
  const currentNewsId = row.original.id;
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState<boolean>(false);
  
  return (
    <>
      <DeleteNewsDialog 
        isOpen={isShowDeleteDialog}
        setIsOpen={setIsShowDeleteDialog}
        selectedNewsId={currentNewsId}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-8 h-8 p-0">
            <span className="sr-only">Відкрити меню</span>
            <Icons.alignJustify className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link 
              href={`/editor/${currentNewsId}`}
              className="hover:cursor-default"
            >
              Редагувати
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setIsShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            Видалити
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}