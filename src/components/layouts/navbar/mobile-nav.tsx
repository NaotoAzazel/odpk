"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderButtons } from "@prisma/client";

import { navConfig } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { getButtonsRequest } from "@/lib/api/actions/buttons";
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
import { NavError } from "@/components/layouts/navbar/nav-error";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buttons, setButtons] = useState<HeaderButtons[]>([]);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const path = usePathname();
  const isDashboardPath = !!path.startsWith("/dashboard");

  useEffect(() => {
    if (isDashboardPath || buttons.length > 0) return;

    const fetchButtons = async () => {
      setIsLoading(true);
      try {
        const { data } = await getButtonsRequest();
        setButtons(data);
      } catch (error) {
        setIsLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchButtons();
    }
  }, [isOpen, buttons.length, isDashboardPath]);

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
        {isLoading ? (
          <div className="flex h-full flex-row items-center justify-center">
            <Icons.spinner className="mr-2 size-4 animate-spin" />
            <span>Завантаження...</span>
          </div>
        ) : isLoadingError ? (
          <div className="flex h-full items-center">
            <NavError />
          </div>
        ) : (
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
            <Accordion type="multiple" className="w-full">
              {isDashboardPath ? (
                <DashboardNav items={navConfig.dashboardNav} />
              ) : (
                <MobileNavItems
                  items={buttons}
                  onClick={(isOpen) => setIsOpen(isOpen)}
                />
              )}
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
                        className="m-1"
                      >
                        {subItem.title}
                      </MobileLink>
                    ) : (
                      <div
                        key={i}
                        className="text-foreground/70 transition-colors"
                        onClick={() => onClick(false)}
                      >
                        {item.title}
                      </div>
                    ),
                  )}
                </div>
              </AccordionContent>
            </>
          ) : (
            <Link
              href={item.href}
              onClick={() => onClick(false)}
              className="flex py-4 text-sm font-medium capitalize hover:underline"
            >
              {item.title}
            </Link>
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
