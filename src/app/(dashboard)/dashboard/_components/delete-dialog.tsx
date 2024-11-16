"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

async function deleteEntity(endpoint: string) {
  const response = await fetch(endpoint, {
    method: "DELETE",
  });

  if (!response?.ok) {
    throw new Error("Виникла помилка під час спроби видалення");
  }
}

interface DeleteDialogProps {
  title?: string;
  description?: string;
  endpoint: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DeleteDialog({
  title,
  description,
  endpoint,
  isOpen,
  onOpenChange,
}: DeleteDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await deleteEntity(endpoint);

      router.refresh();

      showSuccess("Видалення пройшло успішно");
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
          {title && title.length && (
            <AlertDialogTitle className="font-heading font-bold">
              {title}
            </AlertDialogTitle>
          )}
          {description && description.length && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
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
