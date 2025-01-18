import { LoginPage } from "@/views/login";

export const metadata = {
  title: "Авторизацiя",
};

interface LoginPageProps {
  searchParams: { "account-deleted": boolean };
}

export default async function Page({ searchParams }: LoginPageProps) {
  return <LoginPage params={searchParams} />;
}
