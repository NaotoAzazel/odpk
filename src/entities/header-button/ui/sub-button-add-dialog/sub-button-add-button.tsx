"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderButtons } from "@prisma/client";
import { useForm } from "react-hook-form";

import { cn, showError, showSuccess } from "@/shared/lib";
import { SUCCESS_MESSAGES } from "@/shared/notices";
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
  HeaderSubButtonUpdateRequest,
  headerSubButtonUpdateSchema,
} from "../../model";

interface SubButtonAddDialog {
  button: HeaderButtons;
}

export function SubButtonAddDialog({ button }: SubButtonAddDialog) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { updateButton, isPending } = useUpdateHeaderButton();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HeaderSubButtonUpdateRequest>({
    resolver: zodResolver(headerSubButtonUpdateSchema),
    defaultValues: {
      id: new Date().getTime(),
    },
  });

  async function handleCreateSubButton(
    subButton: HeaderSubButtonUpdateRequest,
  ) {
    try {
      const subButtonsWithCurrentData = {
        items: [...button.items, subButton],
      };

      await updateButton({ id: button.id, ...subButtonsWithCurrentData });

      reset();
      setIsDialogOpen(false);
      showSuccess(SUCCESS_MESSAGES["BUTTON_ITEM_ADDED"]);
    } catch (error) {
      showError(error);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between rounded-lg border-2 border-dashed p-4 transition-colors duration-200 hover:cursor-pointer hover:bg-slate-100">
          <div className="flex flex-row items-center">
            <Icons.plus className="mr-2 size-4" />
            <p className="font-heading font-semibold">Додати елемент</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додавання елемента</DialogTitle>
          <DialogDescription>
            Заповніть поля для додавання елемента
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid grid-cols-1 gap-2"
          onSubmit={handleSubmit(handleCreateSubButton)}
        >
          <div className="flex w-full flex-col space-y-2">
            <Label htmlFor="title">Назва кнопки</Label>
            <Input
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
              onClick={() => handleSubmit(handleCreateSubButton)}
              type="submit"
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Додати
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
