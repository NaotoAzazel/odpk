"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderButtons } from "@prisma/client";
import { useForm } from "react-hook-form";

import { cn, showError, showSuccess } from "@/shared/lib";
import { API_SUCCESS } from "@/shared/notices";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
  Input,
  Label,
} from "@/shared/ui";

import { useUpdateHeaderButton } from "../../lib";
import {
  HeaderButtonItem,
  HeaderSubButtonUpdateRequest,
  headerSubButtonUpdateSchema,
} from "../../model";

interface SubButtonEditDialogProps {
  button: HeaderButtons;
  subButtonToDelete: HeaderButtonItem;
  isDialogOpen: boolean;
  onOpenChange: (isDialogOpen: boolean) => void;
}

export function SubButtonEditDialog({
  button,
  subButtonToDelete,
  isDialogOpen,
  onOpenChange,
}: SubButtonEditDialogProps) {
  const { updateButton, isPending } = useUpdateHeaderButton();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HeaderSubButtonUpdateRequest>({
    resolver: zodResolver(headerSubButtonUpdateSchema),
    defaultValues: subButtonToDelete,
  });

  async function handleEditSubButton(
    editedSubButton: HeaderSubButtonUpdateRequest,
  ) {
    try {
      const editedSubButtons = button.items.map((subButton) => {
        if (subButton.id === subButtonToDelete.id) {
          return editedSubButton;
        }

        return subButton;
      });

      const message = await updateButton({
        id: button.id,
        items: editedSubButtons,
      });

      onOpenChange(false);
      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редагування елемента</DialogTitle>
          <DialogDescription>
            Заповніть поля для зміни елемента
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleEditSubButton)}
          className="grid grid-cols-1 gap-2"
        >
          <div className="flex w-full flex-col space-y-2">
            <Label htmlFor="title">Назва кнопки</Label>
            <Input
              id="title"
              type="text"
              {...register("title")}
              placeholder="Директор"
              className={cn({
                "focus-visible:ring-red-500": errors.title,
              })}
            />
            {errors.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col space-y-2">
            <Label htmlFor="description">Опис</Label>
            <Input
              id="description"
              type="text"
              {...register("description")}
              placeholder="Інформація про директора коледжу"
              className={cn({
                "focus-visible:ring-red-500": errors.description,
              })}
            />
            {errors.description && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col space-y-2">
            <div className="flex flex-row">
              <Label htmlFor="href">Посилання</Label>
              <p className="flex h-[14px] items-center text-sm text-muted-foreground">
                (не обов&apos;язково)
              </p>
            </div>
            <Input
              id="href"
              type="text"
              {...register("href")}
              placeholder="Посилання/на/сторінку"
              className={cn({
                "focus-visible:ring-red-500": errors.href,
              })}
            />
            {errors?.href && (
              <p className="px-1 text-xs text-red-600">{errors.href.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending}
              onClick={() => handleSubmit(handleEditSubButton)}
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Зберегти</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
