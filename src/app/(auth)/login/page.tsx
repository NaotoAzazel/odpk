import { z } from "zod";

import MaxWidthWrapper from "@/components/max-width-wrapper";

import { UserAuthForm } from "../_components/user-auth-form";

export const metadata = {
  title: "Авторизацiя",
};

const loginPageSchema = z.object({
  "account-deleted": z.coerce.boolean().optional(),
});

export type LoginPageSchema = z.infer<typeof loginPageSchema>;

interface LoginPageProps {
  searchParams: LoginPageSchema;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const parsedParams = loginPageSchema.parse(searchParams);

  return (
    <MaxWidthWrapper className="flex h-screen">
      <div className="mx-auto flex w-[350px] flex-col items-center justify-center space-y-6">
        {parsedParams["account-deleted"] && (
          <div className="-mt-24 mb-6 grid max-w-xs gap-3 rounded-lg bg-red-300/25 p-4 ring-1 ring-inset ring-red-300/50">
            <p className="grid gap-3 text-sm">
              Ваш обліковий запис було видалено
            </p>
          </div>
        )}

        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Ласкаво просимо
          </h1>
          <p className="text-sm text-muted-foreground">
            Введіть свою електронну пошту та пароль для входу в обліковий запис
          </p>
          <UserAuthForm className="text-left" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
