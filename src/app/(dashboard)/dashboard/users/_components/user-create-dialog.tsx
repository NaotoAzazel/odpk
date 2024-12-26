"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createUserRequest } from "@/lib/api/actions/users";
import { API_SUCCESS } from "@/lib/api/responses/success-messages";
import { showError, showSuccess } from "@/lib/notification";
import { cn } from "@/lib/utils";
import { UserAuthSchema, userAuthSchema } from "@/lib/validation/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

export function UserCreateDialog() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserAuthSchema>({
    resolver: zodResolver(userAuthSchema),
  });

  const onSubmit = async (user: UserAuthSchema) => {
    setIsLoading(true);

    try {
      const { message } = await createUserRequest(user);

      reset();
      setIsOpenDialog(false);
      showSuccess(API_SUCCESS[message]);
      router.refresh();
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Створення акаунта</DialogTitle>
        </DialogHeader>

        <form
          className="grid grid-cols-1 gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-2 py-2">
            <Label htmlFor="email" className="text-gray-800">
              Пошта
            </Label>
            <Input
              {...register("email")}
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
              type="submit"
              onClick={() => handleSubmit(onSubmit)}
            >
              {isLoading && (
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
