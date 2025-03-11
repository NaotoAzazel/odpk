import { DashboardNewsPage } from "@/views/dashboard/news";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новини",
  description: "Керуйте новинами",
};

interface NewsDashboardPageParams {
  searchParams: { page: number };
}

export default async function Page({ searchParams }: NewsDashboardPageParams) {
  return <DashboardNewsPage params={searchParams} />;
}
