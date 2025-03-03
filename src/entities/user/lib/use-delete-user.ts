"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUserByIdRequest } from "../api";
import { USER_QUERY_BASE_KEY } from "./query-keys";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteUserByIdRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_QUERY_BASE_KEY],
      });
    },
  });

  const deleteUser = async (id: string) => {
    const { message } = await mutateAsync(id);
    return message;
  };

  return { deleteUser, isPending };
}
