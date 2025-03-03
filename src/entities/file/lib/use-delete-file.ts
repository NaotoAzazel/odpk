"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFileRequest } from "../api";
import { FILES_QUERY_BASE_KEY } from "./query-keys";

export function useDeleteFile(name: string) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteFileRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FILES_QUERY_BASE_KEY],
      });
    },
  });

  const deleteFile = async () => {
    const { message } = await mutateAsync(name);
    return message;
  };

  return { deleteFile, isPending };
}
