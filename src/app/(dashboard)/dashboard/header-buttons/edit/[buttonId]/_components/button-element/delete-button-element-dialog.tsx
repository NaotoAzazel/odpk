"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderButtonItem } from "@/types";
import { HeaderButtons } from "@prisma/client";

import { SUCCESS_MESSAGES } from "@/config/messages/success";
import { updateButtonByIdRequest } from "@/lib/api/actions/buttons";
import { showError, showSuccess } from "@/lib/notification";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/icons";

interface DeleteButtonElementDialogProps {
  rootButton: HeaderButtons;
  elementToDelete: HeaderButtonItem;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DeleteButtonElementDialog({
  isOpen,
  onOpenChange,
  rootButton,
  elementToDelete,
}: DeleteButtonElementDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const buttonItemsWithoutCurrent = rootButton.items.filter(
        (_) => _.id !== elementToDelete.id,
      );

      await updateButtonByIdRequest(rootButton.id, {
        items: buttonItemsWithoutCurrent,
      });

      router.refresh();
      showSuccess(SUCCESS_MESSAGES["BUTTON_ITEM_DELETED"]);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
      onOpenChange(false);
    }
  };

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
          <AlertDialogCancel disabled={isLoading}>Скасувати</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Видалити</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
