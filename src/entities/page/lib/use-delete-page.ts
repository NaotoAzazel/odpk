"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePageByIdRequest } from "../api";
import { PAGE_QUERY_BASE_KEY } from "./query-keys";

export function useDeletePage() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deletePageByIdRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [PAGE_QUERY_BASE_KEY],
      });
    },
  });

  const deletePage = async (id: number) => {
    const { message } = await mutateAsync(id);
    return message;
  };

  return { deletePage, isPending };
}
