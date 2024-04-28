"use client"

import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";

import { NavItem } from "@/types";

import { cn } from "@/lib/utils";

import Link from "next/link";
import * as React from "react";

import { siteConfig } from "@/config/site";

interface MobileNavProps {
  items: NavItem[];
};

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost"
          className="xl:hidden px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Icons.alignLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <MobileLink
          href="/"
          className="flex items-center"
          setOpen={setIsOpen}
        >
          <Icons.graduationCap className="mr-2 h-5 w-5" />
          <span className="font-bold font-heading">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <Accordion type="multiple" className="w-full">
            <MobileNavItems items={items} setOpen={setIsOpen} />
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileNavItemsProps 
  extends MobileNavProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };

function MobileNavItems({ items, setOpen }: MobileNavItemsProps) {
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
                  <MobileLink
                    key={i}
                    href={subItem.href}
                    setOpen={setOpen}
                    className="m-1"
                  >
                    {subItem.title}
                  </MobileLink>
                ) : (
                  <div
                    key={i} 
                    className="text-foreground/70 transition-colors"
                  >
                    {item.title}
                  </div>
                )
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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  };

function MobileLink({
  children,
  href,
  setOpen,
  className,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </Link>
  );
}

