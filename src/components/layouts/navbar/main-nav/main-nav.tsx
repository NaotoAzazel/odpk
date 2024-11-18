"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { HeaderButtons } from "@prisma/client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MainNavProps {
  items: HeaderButtons[];
}

export default function MainNav({ items }: MainNavProps) {
  return (
    <nav className="hidden xl:flex">
      <NavigationMenu className="z-50 md:ml-4 lg:ml-8">
        <NavigationMenuList className="flex h-full gap-4">
          {items.map((item, index) => (
            <MenuItem button={item} key={index}>
              <NavigationMenuItem
                key={index}
                className="relative flex items-center font-heading"
              >
                {item.items.length > 0 ? (
                  <NavigationMenuTrigger className="font-sans">
                    {item.title}
                  </NavigationMenuTrigger>
                ) : (
                  <Button variant="ghost" className="font-sans">
                    {item.title}
                  </Button>
                )}
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
            </MenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

interface MenuItemProps {
  button: HeaderButtons;
  children: ReactNode;
}

function MenuItem({ button, children }: MenuItemProps) {
  return (
    <>
      {button.href.length > 0 ? (
        <Link href={button.href}>{children}</Link>
      ) : (
        children
      )}
    </>
  );
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
            className,
          )}
          {...props}
        >
          <div className="font-heading text-sm font-semibold leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
