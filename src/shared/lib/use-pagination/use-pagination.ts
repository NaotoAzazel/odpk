"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

interface UsePaginationProps {
  page: number;
}

export function usePagination({ page }: UsePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setCurrentPage = useCallback(
    (newPage: string) => {
      let params = new URLSearchParams(window.location.search);
      if (newPage.length) params.set("page", newPage);
      else params.delete("page");

      router.replace(`${pathname}?${params}`);
    },
    [router, pathname],
  );

  const handlePrevPage = () => {
    if (page > 1) {
      setCurrentPage((page - 1).toString());
    }
  };

  const handleNextPage = () => {
    setCurrentPage((page + 1).toString());
  };

  return { handlePrevPage, handleNextPage, setCurrentPage };
}
