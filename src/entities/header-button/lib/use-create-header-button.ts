"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createButtonRequest } from "../api";
import { HEADER_BUTTONS_QUERY_BASE_KEY } from "../lib";
import { HeaderButtonCreationRequest } from "../model";

export function useCreateHeaderButton() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createButtonRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [HEADER_BUTTONS_QUERY_BASE_KEY],
      });
    },
  });

  const createButton = async (button: HeaderButtonCreationRequest) => {
    const { message } = await mutateAsync(button);
    return message;
  };

  return { createButton, isPending };
}
