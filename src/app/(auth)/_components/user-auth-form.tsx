"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { showError, showSuccess } from "@/lib/notification";
import { cn } from "@/lib/utils";
import { UserAuthSchema, userAuthSchema } from "@/lib/validation/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

function handleStatusCode(code: number) {
  switch (code) {
    case 0:
      return "Статус запиту не визначений. Спробуйте ще раз";
    case 401:
      return "Неправильна пошта або пароль. Переконайтеся в коректності даних";
    default:
      return "Ваш запит на вхід не пройшов. Спробуйте ще раз";
  }
}

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
        const errorStatusCode = signInResult?.status ?? 0;
        const errorMessage = handleStatusCode(errorStatusCode);
        throw new Error(errorMessage);
      }

      showSuccess("Ви успішно авторизувалися");
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
