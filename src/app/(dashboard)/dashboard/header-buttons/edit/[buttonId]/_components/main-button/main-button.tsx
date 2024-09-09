"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderButtons } from "@prisma/client";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  HeaderButtonUpdateRequest,
  HeaderButtonUpdateValidator,
} from "@/lib/validation/header-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface MainButtonProps {
  button: HeaderButtons;
  onUpdate: (data: { title?: string; href?: string }) => void;
}

export function MainButton({ button, onUpdate }: MainButtonProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { toast } = useToast();

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

      const response = await fetch(`/api/buttons/${button.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response?.ok) {
        throw new Error(
          "Виникла помилка під час оновлення даних, спробуйте пізніше",
        );
      }

      onUpdate(data);
      setIsEditing(false);
      reset();

      return toast({
        title: "Успіх!",
        description: "Назву кнопки було змінено",
      });
    } catch (error) {
      if (error instanceof Error) {
        return toast({
          title: "Щось пiшло не так",
          description: error.message,
          variant: "destructive",
        });
      }
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
          <div className="flex flex-col md:flex-row gap-4">
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
