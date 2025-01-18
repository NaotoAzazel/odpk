import { DashboardPagesPage } from "@/views/dashboard/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторінки",
  description: "Керуйте сторінками",
};

export default function Page() {
  return <DashboardPagesPage />;
}
