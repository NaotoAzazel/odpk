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
  HeaderButtonUpdateRequest,
  headerButtonUpdateSchema,
} from "../../model";

interface ButtonEditDialogProps {
  button: HeaderButtons;
}

export function ButtonEditDialog({ button }: ButtonEditDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { updateButton, isPending } = useUpdateHeaderButton();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HeaderButtonUpdateRequest>({
    resolver: zodResolver(headerButtonUpdateSchema),
    defaultValues: {
      id: button.id,
    },
  });

  async function handleUpdateButton(newButton: HeaderButtonUpdateRequest) {
    try {
      const message = await updateButton(newButton);

      reset();
      setIsDialogOpen(false);
      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 p-3">
          <Icons.pencil className="size-4" strokeWidth={2} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редагування кнопки</DialogTitle>
          <DialogDescription>
            Заповніть поля щоб змінити кнопку
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleUpdateButton)}
          className="grid grid-cols-1 gap-2"
        >
          <div className="flex w-full flex-col space-y-2">
            <Label htmlFor="title">Назва кнопки</Label>
            <Input
              {...register("title")}
              id="title"
              type="text"
              placeholder="Документи"
              defaultValue={button.title}
              disabled={isPending}
              className={cn({
                "focus-visible:ring-red-500": errors.title,
              })}
            />
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              disabled={isPending}
              onClick={handleSubmit(handleUpdateButton)}
              type="submit"
            >
              {isPending && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              <span>Зберегти</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
