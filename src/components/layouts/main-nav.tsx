"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Icons } from "@/components/icons";

import { cn } from "@/lib/utils";

import { NavItem } from "@/types";
import Link from "next/link";

import React from "react";

import { siteConfig } from "@/config/site";

interface MainNavProps {
  items: NavItem[];
};

export default function MainNav({ items }: MainNavProps) {
  return (
    <nav className="hidden xl:flex">
      <Link href="/" className="items-center space-x-2 flex">
        <Icons.graduationCap />
        <span className="font-heading font-bold text-xl">{siteConfig.name}</span>
      </Link>

      <NavigationMenu className="z-50 lg:ml-8 md:ml-4">
        <NavigationMenuList className="flex gap-4 h-full">
          {items.map((item, index) => (
            <NavigationMenuItem 
              key={index}
              className="flex relative items-center font-heading"
            >
              <NavigationMenuTrigger className="font-sans">
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {item.items.map((subItem) => (
                    <ListItem 
                      key={subItem.title}
                      title={subItem.title}
                      href={subItem.href}
                    >
                      {subItem.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="font-heading font-semibold text-sm leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem";