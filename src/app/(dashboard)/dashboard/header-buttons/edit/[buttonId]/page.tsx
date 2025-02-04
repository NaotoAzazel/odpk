import { DashboardEditButtonByIdPage } from "@/views/dashboard/header-buttons-edit-by-id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Редагування кнопки",
};

interface PageProps {
  params: {
    buttonId: string;
  };
}

export default async function Page({ params }: PageProps) {
  return <DashboardEditButtonByIdPage params={params} />;
}
