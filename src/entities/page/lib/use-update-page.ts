import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePageByIdRequest } from "../api";
import { PageUpdateRequest } from "../model";
import { PAGE_QUERY_BASE_KEY } from "./query-keys";

export function useUpdatePage() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updatePageByIdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PAGE_QUERY_BASE_KEY],
      });
    },
  });

  const updatePage = async (page: PageUpdateRequest) => {
    const { message } = await mutateAsync(page);
    return message;
  };

  return { updatePage, isPending };
}
