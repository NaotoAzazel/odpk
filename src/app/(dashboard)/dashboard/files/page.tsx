import { DashboardFilesPage } from "@/views/dashboard/files";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Файли",
  description: "Керуйте користувачами",
};

export default async function Page() {
  return <DashboardFilesPage />;
}
