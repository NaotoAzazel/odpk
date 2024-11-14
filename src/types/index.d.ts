import { Prisma } from "@prisma/client";

import { Icons } from "@/components/icons";

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

export type HelpCard = {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
};

export type SpecialtieCard = {
  name: string;
  href: string;
  label: string;
};

// TODO: change this shitt
export type Card = {
  title: string;
  description: string;
};

export type HeaderButtonItem = {
  id: number;
  title: string;
  description: string;
  href: string;
};

export type DisplayMode = "sm" | "md" | "lg" | "xl" | "";

export interface BaseActionButton {
  whenChangeDisplayMode?: DisplayMode;
}

export interface ActionButtonWithHref extends BaseActionButton {
  href: string;
}

export interface ActionButtonWithOnClick extends BaseActionButton {
  onClick: () => void;
}
