"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { UserAuthSchema, userAuthSchema } from "@/entities/user";
import { ApiErrorResponse } from "@/shared/exceptions";
import { cn, showError, showSuccess } from "@/shared/lib";
import { ApiErrorKey } from "@/shared/model";
import { SUCCESS_MESSAGES } from "@/shared/notices";
import { Button, Icons, Input, Label } from "@/shared/ui";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthSchema>({
    resolver: zodResolver(userAuthSchema),
  });

  async function onSubmit(data: UserAuthSchema) {
    setIsLoading(true);

    try {
      const signInResult = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!signInResult?.ok) {
        throw new ApiErrorResponse(signInResult?.error as ApiErrorKey);
      }

      showSuccess(SUCCESS_MESSAGES["SUCCESSFULLY_LOGIN"]);
      router.push("/");
      router.refresh();
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label htmlFor="email">Пошта</Label>
            <Input
              type="email"
              {...register("email")}
              className={cn({
                "focus-visible:ring-red-500": errors.email,
              })}
              autoComplete="email"
              placeholder="name@example.ua"
              disabled={isLoading}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1 py-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              type="password"
              {...register("password")}
              className={cn({
                "focus-visible:ring-red-500": errors.password,
              })}
              placeholder="Password"
              disabled={isLoading}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            onClick={() => handleSubmit(onSubmit)}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Авторизуватись</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
