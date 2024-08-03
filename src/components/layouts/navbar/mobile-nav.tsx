"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types";

import { navConfig } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { DashboardNav } from "@/components/layouts/navbar/dashboard-nav";

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const path = usePathname();
  const isDashboardPath = !!path.startsWith("/dashboard");

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 xl:hidden"
        >
          <Icons.alignLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" onOpenAutoFocus={(e) => e.preventDefault()}>
        <MobileLink
          href="/"
          className="flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <Icons.graduationCap className="mr-2 h-5 w-5" />
          <span className="font-heading font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <Accordion
            type="multiple"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            {isDashboardPath ? (
              <DashboardNav items={navConfig.dashboardNav} />
            ) : (
              <MobileNavItems items={items} />
            )}
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileNavItemsProps extends MobileNavProps {}

function MobileNavItems({ items }: MobileNavItemsProps) {
  return (
    <>
      {items.map((item, i) => (
        <AccordionItem value={item.title} key={i}>
          <AccordionTrigger className="text-sm capitalize">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {item.items.map((subItem, i) =>
                subItem.href ? (
                  <MobileLink key={i} href={subItem.href} className="m-1">
                    {subItem.title}
                  </MobileLink>
                ) : (
                  <div key={i} className="text-foreground/70 transition-colors">
                    {item.title}
                  </div>
                ),
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
}

interface MobileLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

function MobileLink({ children, href, className, ...props }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
