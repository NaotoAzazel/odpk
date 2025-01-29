"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib";
import { Icons } from "@/shared/ui";

import { DashboardSidebarButton } from "../model";

interface DashboardSidebarProps {
  buttons: DashboardSidebarButton[];
}

export function DashboardSidebar({ buttons }: DashboardSidebarProps) {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {buttons.map((item, index) => {
        const Icon = Icons[item.icon || "logo"];

        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path?.startsWith(item.href) ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 size-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
