"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPageRequest } from "../api";
import { PAGE_QUERY_BASE_KEY } from "./query-keys";

export function useCreatePage() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPageRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [PAGE_QUERY_BASE_KEY],
      });
    },
  });

  const createPage = async () => {
    const now = new Date().getTime();

    const { data } = await mutateAsync({
      title: `Generated title ${now}`,
      href: now.toString(),
      content: {
        blocks: [],
        time: now,
        version: "2.29.1",
      },
    });

    return data.id;
  };

  return { createPage, isPending };
}
