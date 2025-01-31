"use client";

import { forwardRef } from "react";

import { cn } from "@/shared/lib";
import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/ui";

import { useHeaderButtons } from "../../lib";
import { ButtonsError } from "./buttons-error";
import { ButtonsSkeleton } from "./buttons-skeleton";

export function Buttons() {
  const { data, isLoading, isError } = useHeaderButtons();

  if (isLoading) {
    return <ButtonsSkeleton buttonsCount={3} />;
  }

  if (isError) {
    return <ButtonsError />;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex h-full gap-4">
        {data?.map((item, index) => (
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
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<
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
