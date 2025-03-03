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

import { useCreateUser } from "../../lib";
import { UserAuthSchema, userAuthSchema } from "../../model";

export function UserCreateDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const { createUser, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserAuthSchema>({
    resolver: zodResolver(userAuthSchema),
  });

  const handleCreateUser = async (user: UserAuthSchema) => {
    try {
      const message = await createUser(user);

      setIsOpenDialog(false);
      showSuccess(API_SUCCESS[message]);
      reset();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icons.plus className="mr-2 h-4 w-4" />
          <span>Користувач</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Створення акаунта</DialogTitle>
          <DialogDescription>
            Занесіть дані в поля щоб додати нового користувача
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid grid-cols-1 gap-1"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <div className="grid gap-2 py-2">
            <Label htmlFor="email" className="text-gray-800">
              Пошта
            </Label>
            <Input
              {...register("email")}
              disabled={isPending}
              className={cn({ "focus-visible:ring-red-500": errors.email })}
              type="email"
              autoComplete="email"
              placeholder="name@example.ua"
            />
            {errors?.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2 py-2">
            <Label htmlFor="email" className="text-gray-800">
              Пароль
            </Label>
            <Input
              {...register("password")}
              disabled={isPending}
              className={cn({ "focus-visible:ring-red-500": errors.password })}
              type="password"
              placeholder="password"
            />
            {errors?.password && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <DialogFooter className="sm:justify-start">
            <Button
              disabled={isPending}
              type="submit"
              onClick={() => handleSubmit(handleCreateUser)}
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
