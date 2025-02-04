"use client";

import { useState } from "react";
import { HeaderButtons } from "@prisma/client";

import {
  HeaderButtonItem,
  SubButtonDeleteDialog,
  SubButtonEditDialog,
} from "@/entities/header-button";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icons,
} from "@/shared/ui";

interface SubButtonActionsDropdownProps {
  button: HeaderButtons;
  subButton: HeaderButtonItem;
}

export function SubButtonActionsDropdown({
  button,
  subButton,
}: SubButtonActionsDropdownProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  return (
    <>
      <SubButtonDeleteDialog
        button={button}
        subButtonToDeleteId={subButton.id}
        isOpen={isDeleteDialogOpen}
        onOpenChange={(isDeleteDialogOpen) =>
          setIsDeleteDialogOpen(isDeleteDialogOpen)
        }
      />

      <SubButtonEditDialog
        button={button}
        subButtonToDelete={subButton}
        isDialogOpen={isEditDialogOpen}
        onOpenChange={(isEditDialogOpen) =>
          setIsEditDialogOpen(isEditDialogOpen)
        }
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex">
          <Button variant="outline" className="h-8 w-8 p-0">
            <Icons.alignJustify className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <Icons.pencil className="mr-2 h-4 w-4" />
            <span className="font-medium">Редагувати</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            <span className="font-medium">Видалити</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
