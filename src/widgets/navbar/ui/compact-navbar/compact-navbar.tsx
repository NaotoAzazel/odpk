"use client";

import { useState } from "react";
import { HeaderButtons } from "@prisma/client";
import Link from "next/link";

import { SITE_CONFIG } from "@/shared/constants";
import { cn } from "@/shared/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Icons,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/ui";

import { useHeaderButtons } from "../../lib";
import { ButtonsError } from "../buttons";

export function CompactNavbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isLoading, isError } = useHeaderButtons({ enabled: isOpen });

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
          <span className="font-heading font-bold">{SITE_CONFIG.name}</span>
        </MobileLink>
        {isLoading ? (
          <div className="flex h-full flex-row items-center justify-center">
            <Icons.spinner className="mr-2 size-4 animate-spin" />
            <span>Завантаження...</span>
          </div>
        ) : isError ? (
          <div className="flex h-full items-center">
            <ButtonsError />
          </div>
        ) : (
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
            <Accordion type="multiple" className="w-full">
              <MobileNavItems
                items={data ?? []}
                onClick={(isOpen) => setIsOpen(isOpen)}
              />
            </Accordion>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}

interface MobileNavItemsProps {
  items: HeaderButtons[];
  onClick: (isOpen: boolean) => void;
}

function MobileNavItems({ items, onClick }: MobileNavItemsProps) {
  return (
    <>
      {items.map((item, i) => (
        <AccordionItem value={item.title} key={i}>
          {item.items.length > 0 ? (
            <>
              <AccordionTrigger className="text-sm capitalize">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  {item.items.map((subItem, i) =>
                    subItem.href ? (
                      <MobileLink
                        onClick={() => onClick(false)}
                        key={i}
                        href={subItem.href}
                      >
                        {subItem.title}
                      </MobileLink>
                    ) : (
                      <div
                        key={i}
                        className="text-foreground/70 transition-colors"
                        onClick={() => onClick(false)}
                      >
                        {subItem.title}
                      </div>
                    ),
                  )}
                </div>
              </AccordionContent>
            </>
          ) : (
            <button
              onClick={() => onClick(false)}
              className="flex py-4 text-sm font-medium capitalize hover:underline"
            >
              {item.title}
            </button>
          )}
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
