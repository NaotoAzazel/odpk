import { DashboardPagesPage } from "@/views/dashboard/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторінки",
  description: "Керуйте сторінками",
};

interface PagesDashboardPageParams {
  searchParams: { page: number };
}

export default function Page({ searchParams }: PagesDashboardPageParams) {
  return <DashboardPagesPage params={searchParams} />;
}
