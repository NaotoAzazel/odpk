"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderButtons } from "@prisma/client";
import { useForm } from "react-hook-form";

import { showError, showSuccess } from "@/lib/notification";
import { cn } from "@/lib/utils";
import {
  HeaderButtonItemCreateRequest,
  HeaderButtonItemCreateValidator,
} from "@/lib/validation/header-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

interface AddButtonItemProps {
  button: HeaderButtons;
}

export function AddButtonItem({ button }: AddButtonItemProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<HeaderButtonItemCreateRequest>({
    resolver: zodResolver(HeaderButtonItemCreateValidator),
  });

  useEffect(() => {
    const now = new Date().getTime();
    setValue("id", now);
  }, [setValue]);

  const onSubmit = async (data: HeaderButtonItemCreateRequest) => {
    try {
      setIsSaving(true);

      const buttonItemsWithCurrentData = { items: [...button.items, data] };

      const response = await fetch(`/api/buttons/${button.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buttonItemsWithCurrentData),
      });

      if (!response?.ok) {
        throw new Error("Виникла помилка під час створення елемента");
      }

      setIsAdding(false);

      reset();
      router.refresh();

      showSuccess("Елемент було створено");
    } catch (error) {
      showError(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      onClick={() => setIsAdding(true)}
      className={cn(
        "flex items-center justify-between rounded-lg border-2 border-dashed p-4 transition-colors duration-200",
        { "hover:cursor-pointer hover:bg-slate-100": !isAdding },
      )}
    >
      {isAdding ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-2"
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
                setIsAdding(false);
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
        <div className="flex flex-row items-center">
          <Icons.plus className="mr-2 size-4" />
          <p className="font-heading font-semibold">Додати елемент</p>
        </div>
      )}
    </div>
  );
}
