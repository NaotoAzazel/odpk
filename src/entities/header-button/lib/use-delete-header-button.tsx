import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteButtonByIdRequest } from "../api";
import { HEADER_BUTTONS_QUERY_BASE_KEY } from "./query-keys";

export function useDeleteHeaderButton() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteButtonByIdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [HEADER_BUTTONS_QUERY_BASE_KEY],
      });
    },
  });

  const deleteButton = async (id: number) => {
    const { message } = await mutateAsync(id);
    return message;
  };

  return { deleteButton, isPending };
}
