import { HeaderButtonsPage } from "@/views/dashboard/header-buttons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кнопки заголовка",
  description: "Керуйте кнопками заголовка",
};

export default async function Page() {
  return <HeaderButtonsPage />;
}
