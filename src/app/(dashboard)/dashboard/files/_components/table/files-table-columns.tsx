import { useState } from "react";
import { Files, FileTypes } from "@prisma/client";

import { CustomColumnDef } from "@/types/table";
import { redirects } from "@/config/constants";
import { showError, showSuccess } from "@/lib/notification";
import { formatDate } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Icons } from "@/components/icons";
import { ResponsiveImage } from "@/components/image/responsive-image";

import {
  DeleteButton,
  LinkToButton,
} from "../../../_components/action-cell/action-buttons";
import { ActionMenu } from "../../../_components/action-cell/action-menu";
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
        <div className="flex min-h-[52px] min-w-[52px] flex-row">
          <div className="absolute inset-0 z-0 size-[52px] rounded-md bg-accent" />
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
      cell: function Cell({ row }) {
        const [_, copy] = useCopyToClipboard();

        const name = row.original.name;
        const type = row.original.type;

        async function copyFilePreviewUrl(name: string) {
          try {
            await copy(`${redirects.toFilePreview}/${name}`);
            showSuccess("Посилання на файл скопійовано");
          } catch (error) {
            showError(error);
          }
        }

        return (
          <div className="flex w-full flex-row items-center gap-3">
            <FilePreviewIcon fileType={type} name={name} />
            <div className="max-w-56">
              <span
                title={name}
                onClick={() => copyFilePreviewUrl(name)}
                className="line-clamp-2 cursor-pointer overflow-hidden text-ellipsis whitespace-normal break-words"
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

        const toFilePreview = `${redirects.toFilePreview}/${row.original.name}`;

        return (
          <>
            <div className="hidden flex-row gap-2 md:flex">
              <LinkToButton href={toFilePreview} />
              <DeleteButton onClick={() => setIsShowDeleteDialog(true)} />
            </div>

            <DeleteDialog
              title="Ви впевнені що хочете видалити файл?"
              description="Цю дію не можна буде скасувати."
              endpoint={`/api/files/${row.original.name}`}
              isOpen={isShowDeleteDialog}
              onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
            />

            <ActionMenu
              buttons={[
                { type: "link", href: toFilePreview },
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
