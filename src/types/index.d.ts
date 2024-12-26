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

export type ErrorKey =
  | "CANT_SAVE_EDITOR_DATA"
  | "FILE_NOT_FOUND"
  | "CANNOT_UPLOAD_MORE_THAN_1_FILE"
  | "CANNOT_UPLOAD_MORE_THAN_N_FILES"
  | "FILES_CANCELED"
  | "YOUR_REVIEW_NOT_SUBMITTED"
  | "UNKNOWN_ERROR";
export type ErrorValue = string;

export type SuccessKey =
  | "BUTTON_ITEM_ADDED"
  | "BUTTON_ITEM_DELETED"
  | "NEWS_ITEM_PUBLISHED"
  | "SUCCESSFULLY_LOGIN"
  | "LINK_TO_FILE_COPIED"
  | "FILES_UPLOADED"
  | "YOUR_REVIEW_SUBMITTED";
export type SuccessValue = string;
