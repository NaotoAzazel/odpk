import { DashboardUsersPage } from "@/views/dashboard/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Користувачі",
  description: "Керуйте користувачами",
};

export default async function Page() {
  return <DashboardUsersPage />;
}
