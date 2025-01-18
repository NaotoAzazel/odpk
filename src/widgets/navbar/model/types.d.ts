import { Icons } from "@/shared/ui/icons";

export type DashboardNavItem = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  disabled?: boolean;
};

export type NavSubItem = {
  title: string;
  href: string;
  description?: string;
};

export type NavItem = {
  title: string;
  items: NavSubItem[];
};

export type NavbarConfig = {
  mainNav: NavItem[];
  dashboardNav: DashboardNavItem[];
};
