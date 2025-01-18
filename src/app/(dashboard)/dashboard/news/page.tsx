import { DashboardNewsPage } from "@/views/dashboard/news";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новини",
  description: "Керуйте новинами",
};

export default async function Page() {
  return <DashboardNewsPage />;
}
