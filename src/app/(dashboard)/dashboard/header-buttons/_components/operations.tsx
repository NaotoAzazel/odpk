"use client";

import { useState } from "react";
import Link from "next/link";
import { HeaderButtons } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

import { DeleteDialog } from "../../_components/delete-dialog";
import { redirects } from '@/config/constants'

interface OperationsProps {
  data: HeaderButtons;
}

export function Operations({ data }: OperationsProps) {
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState<boolean>(false);

  return (
    <>
      <DeleteDialog
        title="Ви впевнені що хочете видалити цю кнопку?"
        description="Цю дію не можна буде скасувати."
        endpoint={`/api/buttons/${data.id}`}
        isOpen={isShowDeleteDialog}
        onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex">
          <Button variant="outline" className="h-8 w-8 p-0">
            <Icons.alignJustify className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <Link
            href={`${redirects.toHeaderButtonEdit}/${data.id}`}
            className="flex flex-row items-center hover:cursor-default"
          >
            <DropdownMenuItem>
              <Icons.pencil className="mr-2 h-4 w-4" />
              <span>Редагувати</span>
            </DropdownMenuItem>
          </Link>
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
}
