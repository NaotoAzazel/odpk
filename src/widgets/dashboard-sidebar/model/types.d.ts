import { Icons } from "@/shared/ui";

export type DashboardSidebarButton = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  disabled?: boolean;
};
