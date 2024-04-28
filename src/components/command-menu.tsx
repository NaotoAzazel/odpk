"use client"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { useCallback, useState } from "react";

import { navConfig } from "@/config/nav";

import { useRouter } from "next/navigation";

export function CommandMenu() {
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const runCommand = useCallback((command: () => unknown) => {
    setIsOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative w-full justify-start xl:w-56 rounded bg-background"
      >
        <Icons.search className="mr-2 h-4 w-4" aria-hidden="true" />
        <span className="inline-flex">Пошук сторiнок...</span>
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Пошук..." />
        <CommandList>
          <CommandEmpty>Не знайдено результатів</CommandEmpty>
          {navConfig.mainNav.map((item) => (
            <CommandGroup heading={item.title} key={item.title}>
              {item.items.map((subItem, i) => (
                <CommandItem 
                  key={i}
                  value={subItem.title}
                  className=""
                  onSelect={() => {
                    runCommand(() => router.push(subItem.href as string))
                  }}
                >
                  <Icons.file className="mr-2 h-4 w-4" />
                  <span>{subItem.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
