import { NavBarConfig } from "@/types";

export const navConfig: NavBarConfig = {
  mainNav: [],
  dashboardNav: [
    {
      title: "Новини",
      href: "/dashboard/news",
      icon: "file",
    },
    {
      title: "Статичні сторінки",
      href: "/dashboard/pages",
      icon: "notebookText",
    },
    {
      title: "Кнопки заголовка",
      href: "/dashboard/header-buttons",
      icon: "sliders",
    },
    {
      title: "Користувачі",
      href: "/dashboard/users",
      icon: "users",
    },
  ],
};
