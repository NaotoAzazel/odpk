"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createButtonRequest } from "@/lib/api/actions/buttons";
import { API_SUCCESS } from "@/lib/api/responses/success-messages";
import { showError, showSuccess } from "@/lib/notification";
import { cn } from "@/lib/utils";
import {
  HeaderButtonCreationRequest,
  HeaderButtonValidator,
} from "@/lib/validation/header-buttons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

export function ButtonsCreateButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeaderButtonCreationRequest>({
    resolver: zodResolver(HeaderButtonValidator),
    defaultValues: {
      href: "",
    },
  });

  const onSubmit = async (data: HeaderButtonCreationRequest) => {
    try {
      setIsLoading(true);

      const result = await createButtonRequest(data);

      setIsDialogOpen(false);
      router.refresh();
      showSuccess(API_SUCCESS[result.message]);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              {isLoading && (
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
