"use client"

import { Icons } from "@/components/icons";

import { DashboardNavItem } from "@/types";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardNavProps {
  items: DashboardNavItem[];
};

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "logo"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path.startsWith(item.href) ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  );
}