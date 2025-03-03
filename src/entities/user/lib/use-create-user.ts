"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUserRequest } from "../api";
import { UserAuthSchema } from "../model";
import { USER_QUERY_BASE_KEY } from "./query-keys";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUserRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_QUERY_BASE_KEY],
      });
    },
  });

  const createUser = async (user: UserAuthSchema) => {
    const { message } = await mutateAsync(user);
    return message;
  };

  return { createUser, isPending };
}
