import { HeaderButtonsPage } from "@/views/dashboard/header-buttons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кнопки заголовка",
  description: "Керуйте кнопками заголовка",
};

interface HeaderButtonsDashboardPageParams {
  searchParams: { page: number };
}

export default async function Page({
  searchParams,
}: HeaderButtonsDashboardPageParams) {
  return <HeaderButtonsPage params={searchParams} />;
}
