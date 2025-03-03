"use client";

import { useState } from "react";
import { HeaderButtons } from "@prisma/client";

import { showError, showSuccess } from "@/shared/lib";
import { SUCCESS_MESSAGES } from "@/shared/notices";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Icons,
} from "@/shared/ui";

import { useUpdateHeaderButton } from "../../lib";

interface SubButtonDeleteDialogProps {
  button: HeaderButtons;
  subButtonToDeleteId: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function SubButtonDeleteDialog({
  button,
  subButtonToDeleteId,
  isOpen,
  onOpenChange,
}: SubButtonDeleteDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { updateButton, isPending } = useUpdateHeaderButton();

  async function handleDeleteSubButton() {
    setIsLoading(true);

    try {
      const subButtonsWithoutCurrent = button.items.filter(
        (subButton) => subButton.id !== subButtonToDeleteId,
      );

      await updateButton({ id: button.id, items: subButtonsWithoutCurrent });

      onOpenChange(false);
      showSuccess(SUCCESS_MESSAGES["BUTTON_ITEM_DELETED"]);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const isInteractionDisabled = isPending || isLoading;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading font-bold">
            Ви впевнені що хочете видалити цей елемент?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Цю дію не можна буде скасувати.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isInteractionDisabled}>
            Скасувати
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={handleDeleteSubButton}
            disabled={isInteractionDisabled}
          >
            {isInteractionDisabled && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Видалити</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
