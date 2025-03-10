import { DashboardFilesPage } from "@/views/dashboard/files";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Файли",
  description: "Керуйте користувачами",
};

interface FilesDashboardPageParams {
  searchParams: { page: number };
}

export default async function Page({ searchParams }: FilesDashboardPageParams) {
  return <DashboardFilesPage params={searchParams} />;
}
