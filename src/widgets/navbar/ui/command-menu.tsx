"use client";

import { useCallback, useEffect, useState } from "react";
import { StaticPages } from "@prisma/client";
import { useRouter } from "next/navigation";

import { getPagesRequest } from "@/entities/page";
import { REDIRECTS } from "@/shared/constants";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Icons,
} from "@/shared/ui";

export function CommandMenu() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pages, setPages] = useState<StaticPages[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const runCommand = useCallback((command: () => unknown) => {
    setIsOpen(false);
    command();
  }, []);

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);

      // TODO: super bad place (if here error do something)
      const result = await getPagesRequest();
      setPages(result.data);
      setIsLoading(false);
    };

    if (isOpen && pages.length === 0) {
      fetchPages();
    }
  }, [isOpen, pages.length]);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative w-full justify-start rounded bg-background xl:w-56"
      >
        <Icons.search className="mr-2 h-4 w-4" aria-hidden="true" />
        <span className="inline-flex">Пошук сторiнок...</span>
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput disabled={isLoading} placeholder="Пошук..." />
        <CommandList>
          {isLoading ? (
            <div className="flex flex-row items-center justify-center py-6">
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              <span>Завантаження...</span>
            </div>
          ) : (
            <>
              <CommandEmpty>Не знайдено результатів</CommandEmpty>
              {pages.length > 0 && (
                <CommandGroup heading="Сторінки">
                  {pages.map((page, index) => (
                    <CommandItem
                      key={index}
                      value={page.title}
                      className=""
                      onSelect={() => {
                        runCommand(() =>
                          router.push(`${REDIRECTS.toPageItem}/${page.href}`),
                        );
                      }}
                    >
                      <Icons.file className="mr-2 h-4 w-4" />
                      <span>{page.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
