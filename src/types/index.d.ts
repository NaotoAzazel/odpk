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

export type NavBarConfig = {
  mainNav: NavItem[];
};

export type InformatioCard = {
  title: string;
  icon: keyof typeof Icons;
  href: string;
};

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