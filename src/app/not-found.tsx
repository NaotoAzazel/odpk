import { NotFoundPage } from "@/views/page-404";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторiнку не знайдено",
  description: "Не вдалося знайти сторінку, яку ви шукаєте",
};

export default function NotFound() {
  return <NotFoundPage />;
}
