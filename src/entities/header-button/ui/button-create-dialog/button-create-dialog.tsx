"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { useCreateHeaderButton } from "../../lib";
import { HeaderButtonCreationRequest, headerButtonSchema } from "../../model";

export function ButtonCreateDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { createButton, isPending } = useCreateHeaderButton();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeaderButtonCreationRequest>({
    resolver: zodResolver(headerButtonSchema),
    defaultValues: {
      href: "",
    },
  });

  const onSubmit = async (data: HeaderButtonCreationRequest) => {
    try {
      const message = await createButton(data);

      setIsDialogOpen(false);
      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icons.plus className="mr-2 h-4 w-4" />
          <span>Кнопка</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading font-bold">
            Додавання кнопки
          </DialogTitle>
          <DialogDescription>
            Занесіть дані в поля щоб додати нову кнопку
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 py-2">
            <Label htmlFor="text">Назва кнопки</Label>
            <Input
              id="text"
              type="text"
              placeholder="Документи"
              {...register("title")}
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
          <div className="grid gap-2 py-2">
            <div className="flex flex-row items-center">
              <Label htmlFor="href">Посилання</Label>
              <p className="text-sm text-muted-foreground">
                (не обов&apos;язково)
              </p>
            </div>
            <Input
              id="href"
              type="text"
              placeholder="path/to/page"
              {...register("href")}
              className={cn({
                "focus-visible:ring-red-500": errors.href,
              })}
            />
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.href?.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Додати</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
