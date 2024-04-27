import MaxWidthWrapper from "@/components/max-width-wrapper";
import { UserAuthForm } from "../_components/user-auth-form";

export const metadata = {
  title: "Авторизацiя"
};

export default async function LoginPage() {
  return (
    <MaxWidthWrapper className="flex h-screen">
      <div className="mx-auto flex flex-col items-center justify-center space-y-6 w-[350px]">
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