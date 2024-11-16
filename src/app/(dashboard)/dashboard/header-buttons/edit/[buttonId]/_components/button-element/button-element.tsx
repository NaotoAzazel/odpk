"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderButtonItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderButtons } from "@prisma/client";
import { useForm } from "react-hook-form";

import { showError, showSuccess } from "@/lib/notification";
import { cn } from "@/lib/utils";
import {
  HeaderButtonItemUpdateRequest,
  HeaderButtonItemUpdateValidator,
} from "@/lib/validation/header-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

import { ButtonElementOperations } from "./button-element-operations";

interface ButtonElementProps {
  rootButton: HeaderButtons;
  buttonElement: HeaderButtonItem;
}

export function ButtonElement({
  rootButton,
  buttonElement,
}: ButtonElementProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HeaderButtonItemUpdateRequest>({
    resolver: zodResolver(HeaderButtonItemUpdateValidator),
    defaultValues: {
      ...buttonElement,
    },
  });

  const onSubmit = async (data: HeaderButtonItemUpdateRequest) => {
    try {
      setIsSaving(true);

      const editedButtonItems = rootButton.items.map((element) => {
        if (element.id === buttonElement.id) {
          return data;
        }

        return element;
      });

      const response = await fetch(`/api/buttons/${rootButton.id}`, {
        method: "PATCH",
        body: JSON.stringify({ items: editedButtonItems }),
      });

      if (!response?.ok) {
        throw new Error("Виникла помилка під час зміни елемента");
      }

      router.refresh();

      showSuccess("Елемент було змінено");
    } catch (error) {
      showError(error);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-2 p-4"
        >
          <div className="flex flex-col gap-2 md:flex-row">
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
                <p className="px-1 text-xs text-red-600">
                  {errors.href.message}
                </p>
              )}
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isSaving}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
              }}
            >
              Відміна
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isSaving}
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit(onSubmit);
              }}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Зберегти</span>
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-row items-center">
            <div className="ml-2 grid gap-1">
              <p
                className="font-heading font-bold hover:cursor-pointer hover:underline"
                onClick={() => setIsEditing(true)}
              >
                {buttonElement.title}
              </p>
              <div>
                <p className="text-sm text-muted-foreground">
                  {buttonElement.description}
                </p>
              </div>
            </div>
          </div>
          <ButtonElementOperations
            rootButton={rootButton}
            elementToDelete={buttonElement}
            onOpenChange={(isOpen) => setIsEditing(isOpen)}
          />
        </div>
      )}
    </>
  );
}
