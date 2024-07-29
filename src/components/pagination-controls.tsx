"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Metadata } from "@/lib/actions/news";
import { cn } from "@/lib/utils";

import { usePathname, useRouter } from "next/navigation";

import { useCallback } from "react";

interface PaginationControlsProps extends Metadata {
  currentPage?: number;
}

export function PaginationControls({
  currentPage = 1,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const pages = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    pages.push(i);
  }

  const setCurrentPage = useCallback(
    (newPage: string) => {
      let params = new URLSearchParams(window.location.search);
      if (newPage.length) params.set("page", newPage);
      else params.delete("page");

      router.replace(`${pathname}?${params}`);
    },
    [router, pathname],
  );

  function handlePage(action: number) {
    setCurrentPage(action.toString());
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              !hasPrevPage &&
                "pointer-events-none cursor-not-allowed opacity-50",
              "cursor-pointer",
            )}
            onClick={() => handlePage(currentPage - 1)}
          />
        </PaginationItem>
        {pages.map((page, i) => (
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => handlePage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePage(++currentPage)}
            className={cn(
              !hasNextPage &&
                "pointer-events-none cursor-not-allowed opacity-50",
              "cursor-pointer",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
