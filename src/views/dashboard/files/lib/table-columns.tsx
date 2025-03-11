import { useState } from "react";
import { Files, FileTypes } from "@prisma/client";

import { CustomColumnDef, DataTableColumnHeader } from "@/widgets/data-table";
import { FileDeleteDialog } from "@/entities/file";
import { useCopyToClipboard } from "@/shared/actions";
import { REDIRECTS } from "@/shared/constants";
import { formatDate, showError, showSuccess } from "@/shared/lib";
import { SUCCESS_MESSAGES } from "@/shared/notices";
import {
  ActionsDropdownMenu,
  DeleteButton,
  Icons,
  NavigateToPageButton,
  ResponsiveImageWithBlur,
} from "@/shared/ui";

const fileTypeMap: Record<FileTypes, string> = {
  [FileTypes.DOCUMENT]: "Файл",
  [FileTypes.IMAGE]: "Зображення",
};

interface FilePreviewIconProps {
  name: string;
  fileType: FileTypes;
}

function FilePreviewIcon({ fileType, name }: FilePreviewIconProps) {
  const src = `${REDIRECTS.toFilePreview}/${name}`;

  return (
    <div className="relative">
      {fileType === "IMAGE" ? (
        <div className="flex h-[52px] min-h-[52px] w-[52px] min-w-[52px]">
          <ResponsiveImageWithBlur
            src={src}
            alt={name}
            width={52}
            height={52}
            loading="lazy"
            className="z-10 aspect-square rounded-md object-cover"
            errorPlaceholderClassname="size-[52px] text-black"
            smallSize
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
            await copy(`${REDIRECTS.toFilePreview}/${name}`);
            showSuccess(SUCCESS_MESSAGES["LINK_TO_FILE_COPIED"]);
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

        const toFilePreview = `${REDIRECTS.toFilePreview}/${row.original.name}`;

        return (
          <>
            <ActionsDropdownMenu
              actionSlot={
                <>
                  <NavigateToPageButton
                    href={toFilePreview}
                    text="Відкрити"
                    icon="openLink"
                  />
                  <DeleteButton
                    text="Видалити"
                    onClick={() => setIsShowDeleteDialog(true)}
                  />
                </>
              }
            />

            <FileDeleteDialog
              name={row.original.name}
              isOpen={isShowDeleteDialog}
              onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
            />
          </>
        );
      },
    },
  ];
}
