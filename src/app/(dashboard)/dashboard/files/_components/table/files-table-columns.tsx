import { useState } from "react";
import { Files, FileTypes } from "@prisma/client";

import { CustomColumnDef } from "@/types/table";
import { redirects } from "@/config/constants";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Icons } from "@/components/icons";
import { ResponsiveImage } from "@/components/responsive-image";

import {
  DeleteButton,
  LinkToButton,
} from "../../../_components/action-cell/action-buttons";
import { DeleteDialog } from "../../../_components/delete-dialog";

const fileTypeMap: Record<FileTypes, string> = {
  [FileTypes.DOCUMENT]: "Файл",
  [FileTypes.IMAGE]: "Зображення",
};

interface FilePreviewIconProps {
  name: string;
  fileType: FileTypes;
}

function FilePreviewIcon({ fileType, name }: FilePreviewIconProps) {
  const src = `${redirects.toFilePreview}/${name}`;

  return (
    <div className="relative">
      {fileType === "IMAGE" ? (
        <div className="flex flex-row">
          <Skeleton className="absolute inset-0 z-0 size-[52px]" />
          <ResponsiveImage
            src={src}
            alt={name}
            width={52}
            height={52}
            loading="lazy"
            className="z-10 aspect-square rounded-md object-cover"
          />
        </div>
      ) : (
        <div className="flex size-[52px] shrink-0 items-center justify-center rounded-md bg-muted">
          <Icons.file className="size-7" strokeWidth={1} />
        </div>
      )}
    </div>
  );
}

export function getColumns(): CustomColumnDef<Files>[] {
  return [
    {
      accessorKey: "name",
      meta: {
        translatedName: "Назва",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Назва" />
      ),
      cell: ({ row }) => {
        const name = row.original.name;
        const type = row.original.type;

        return (
          <div className="flex flex-row items-center gap-3">
            <FilePreviewIcon fileType={type} name={name} />
            <div className="max-w-56">
              <span
                title={name}
                className="line-clamp-2 overflow-hidden text-ellipsis whitespace-normal break-words"
              >
                {name}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      meta: {
        translatedName: "Тип",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Тип" />
      ),
      cell: ({ row }) => (
        <span>{fileTypeMap[row.original.type] || "Невідомий тип файлу"}</span>
      ),
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
        const [isShowDeleteDialog, setIsShowDeleteDialog] =
          useState<boolean>(false);

        return (
          <>
            <div className="hidden flex-row gap-2 md:flex">
              <LinkToButton
                href={`${redirects.toFilePreview}/${row.original.name}`}
              />
              <DeleteButton onClick={() => setIsShowDeleteDialog(true)} />
            </div>

            <DeleteDialog
              title="Ви впевнені що хочете видалити файл?"
              description="Цю дію не можна буде скасувати."
              endpoint={`/api/files/${row.original.name}`}
              isOpen={isShowDeleteDialog}
              onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
            />
          </>
        );
      },
    },
  ];
}
