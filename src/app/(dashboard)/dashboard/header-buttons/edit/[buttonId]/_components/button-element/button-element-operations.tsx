"use client";

import { useState } from "react";
import { HeaderButtonItem } from "@/types";
import { HeaderButtons } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

import { DeleteButtonElementDialog } from "./delete-button-element-dialog";

interface ButtonElementOperationsProps {
  rootButton: HeaderButtons;
  elementToDelete: HeaderButtonItem;
  onOpenChange: (isOpen: boolean) => void;
}

export function ButtonElementOperations({
  rootButton,
  elementToDelete,
  onOpenChange,
}: ButtonElementOperationsProps) {
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState<boolean>(false);

  return (
    <>
      <DeleteButtonElementDialog
        isOpen={isShowDeleteDialog}
        onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
        rootButton={rootButton}
        elementToDelete={elementToDelete}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex">
          <Button variant="outline" className="h-8 w-8 p-0">
            <Icons.alignJustify className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onOpenChange(true)}>
            <Icons.pencil className="mr-2 h-4 w-4" />
            <span>Редагувати</span>
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
}
