"use client";

import { useCallback, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getPagesForPagination, PAGE_QUERY_BASE_KEY } from "@/entities/page";
import { REDIRECTS } from "@/shared/constants";
import { useDebounce, useIntersection } from "@/shared/lib";
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

const ITEMS_PER_VIEW = 8;

export function SearchPagesBar() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 1_000);

  const runCommand = useCallback((command: () => unknown) => {
    setIsOpen(false);
    command();
  }, []);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    fetchStatus,
  } = useInfiniteQuery({
    queryKey: [PAGE_QUERY_BASE_KEY, "list", debouncedSearch],
    queryFn: (meta) =>
      getPagesForPagination({
        page: meta.pageParam,
        itemsPerPage: ITEMS_PER_VIEW,
        title: debouncedSearch,
        sortByCreatedAt: "asc",
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.metadata.hasNextPage ? nextPage : undefined;
    },
    select: (result) => result.pages.flatMap((page) => page.data),
    enabled: isOpen,
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
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
          value={searchInput}
          onValueChange={(value) => setSearchInput(value)}
        />
        <CommandList>
          {isLoading ? (
            <div className="flex flex-row items-center justify-center py-6">
              <Icons.spinner className="mr-2 size-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Завантаження...
              </span>
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
              {data?.length === 0 && fetchStatus === "idle" && (
                <CommandEmpty>Не знайдено результатів</CommandEmpty>
              )}
              <CommandGroup heading="Сторінки">
                {data?.map((pageItem, index) => (
                  <CommandItem
                    key={index}
                    value={pageItem.title}
                    className=""
                    onSelect={() => {
                      runCommand(() =>
                        router.push(`${REDIRECTS.toPageItem}/${pageItem.href}`),
                      );
                    }}
                  >
                    <Icons.file className="mr-2 h-4 w-4" />
                    <span>{pageItem.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {hasNextPage && (
                <div
                  className="flex flex-row items-center justify-center py-4"
                  ref={cursorRef}
                >
                  {isFetchingNextPage && (
                    <>
                      <Icons.spinner className="mr-2 size-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Завантаження...
                      </span>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
