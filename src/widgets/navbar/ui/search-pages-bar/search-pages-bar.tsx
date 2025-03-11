"use client";

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getPages, PAGE_QUERY_BASE_KEY } from "@/entities/page";
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

export function SearchPagesBar() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const runCommand = useCallback((command: () => unknown) => {
    setIsOpen(false);
    command();
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: [PAGE_QUERY_BASE_KEY, "all"],
    queryFn: () => getPages(),
    enabled: isOpen,
  });

  return (
    <div className="w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative w-full justify-start rounded bg-background"
      >
        <Icons.search className="mr-2 h-4 w-4" aria-hidden="true" />
        <span className="inline-flex pr-4">Пошук сторiнок...</span>
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          disabled={isLoading}
          className="font-sans font-medium"
          placeholder="Пошук..."
        />
        <CommandList>
          {isLoading ? (
            <div className="flex flex-row items-center justify-center py-6">
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              <span>Завантаження...</span>
            </div>
          ) : isError ? (
            <div className="justify-centerp-2 flex w-full p-4">
              <h2 className="text-heading text-sm font-medium text-red-600">
                Виникла помилка під час завантаження сторінок, перезавантажте
                сторінку
              </h2>
            </div>
          ) : (
            <>
              <CommandEmpty>Не знайдено результатів</CommandEmpty>
              <CommandGroup heading="Сторінки">
                {data?.map((page, index) => (
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
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
