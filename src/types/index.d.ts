import { Icons } from "@/components/icons";
import { Prisma } from "@prisma/client";

export type NavSubItem = {
  title: string;
  href: string;
  description?: string;
};

export type NavItem = {
  title: string;
  items: NavSubItem[];
};

export type DashboardNavItem = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  disabled?: boolean;
};

export type NavBarConfig = {
  mainNav: NavItem[];
  dashboardNav: DashboardNavItem[];
};

export type InformatioCard = {
  title: string;
  icon: keyof typeof Icons;
  href: string;
};

type TailwindColor = "violet" | "blue" | "cyan" | "green";
export type NewInformationCard = {
  title: string;
  icon: keyof typeof Icons;
  href: string;
  color: TailwindColor;
};

export type AboutUsCard = {
  title: string;
  description: string;
}

export type HeroCard = AboutUsCard;

export type HelpCard = {
  title: string;
  items: { 
    title: string; 
    href: string;
  }[];
};

export type Post = {
  id: number;
  title: string;
  content: Prisma.JsonValue;
  images: string[];
};