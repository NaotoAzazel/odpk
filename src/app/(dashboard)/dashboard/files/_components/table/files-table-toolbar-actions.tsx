"use client";

import Link from "next/link";
import { Files } from "@prisma/client";
import { type Table } from "@tanstack/react-table";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { TableInputSearch } from "../../../_components/table/table-input-search";

interface FilesTableToolbarActionsProps {
  table: Table<Files>;
}

export function FilesTableToolbarActions({
  table,
}: FilesTableToolbarActionsProps) {
  return (
    <div className="flex w-full items-center justify-center space-x-2 overflow-auto">
      <div className="flex flex-1 items-center">
        <TableInputSearch table={table} searchByColumnName="name" />
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/files/upload"
          className={buttonVariants({ variant: "outline" })}
        >
          <Icons.plus className="mr-2 h-4 w-4" />
          Файл
        </Link>
      </div>
    </div>
  );
}