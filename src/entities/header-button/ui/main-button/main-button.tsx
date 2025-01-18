"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderButtons } from "@prisma/client";
import { useForm } from "react-hook-form";

import { cn, showError, showSuccess } from "@/shared/lib";
import { API_SUCCESS } from "@/shared/notices";
import { Button, Icons, Input, Label } from "@/shared/ui";

import { updateButtonByIdRequest } from "../../api";
import {
  HeaderButtonUpdateRequest,
  HeaderButtonUpdateValidator,
} from "../../model";

interface MainButtonProps {
  button: HeaderButtons;
  onUpdate: (data: { title?: string; href?: string }) => void;
}

export function MainButton({ button, onUpdate }: MainButtonProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HeaderButtonUpdateRequest>({
    resolver: zodResolver(HeaderButtonUpdateValidator),
  });

  const onSubmit = async (data: HeaderButtonUpdateRequest) => {
    try {
      setIsSaving(true);

      const { message } = await updateButtonByIdRequest(button.id, data);

      onUpdate(data);
      setIsEditing(false);
      reset();

      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md border p-4">
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-2"
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex w-full flex-col space-y-2">
              <Label htmlFor="title">Назва кнопки</Label>
              <Input
                {...register("title")}
                id="title"
                type="text"
                placeholder="Документи"
                defaultValue={button.title}
                disabled={isSaving}
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
                placeholder="path/to/page"
                defaultValue={button.href}
                {...register("href")}
                className={cn("w-full", {
                  "focus-visible:ring-red-500": errors.href,
                })}
              />
              {errors?.title && (
                <p className="px-1 text-xs text-red-600">
                  {errors.href?.message}
                </p>
              )}
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isSaving}
              onClick={() => setIsEditing(false)}
            >
              Відміна
            </Button>
            <Button
              size="sm"
              disabled={isSaving}
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Зберегти</span>
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="ml-2 flex flex-row items-center">
            <p className="font-heading font-semibold">{button.title}</p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="h-8 p-3"
          >
            <Icons.pencil className="size-4" strokeWidth={2} />
          </Button>
        </>
      )}
    </div>
  );
}
