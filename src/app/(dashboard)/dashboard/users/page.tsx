import { DashboardUsersPage } from "@/views/dashboard/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Користувачі",
  description: "Керуйте користувачами",
};

interface UsersDashboardPageParams {
  searchParams: { page: number };
}

export default async function Page({ searchParams }: UsersDashboardPageParams) {
  return <DashboardUsersPage params={searchParams} />;
}
