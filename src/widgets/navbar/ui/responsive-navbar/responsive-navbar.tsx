"use client";

import { useMediaQuery } from "@/shared/ui";

import { CompactNavbar } from "../compact-navbar";
import { PrimaryNavbar } from "../primary-navbar";

export function ResponsiveNavbar() {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return isDesktop ? <PrimaryNavbar /> : <CompactNavbar />;
}
