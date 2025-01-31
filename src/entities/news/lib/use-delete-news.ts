import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNewsItemByIdRequest } from "../api";
import { NEWS_QUERY_BASE_KEY } from "./query-keys";

export function useDeleteNews(id: number) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteNewsItemByIdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [NEWS_QUERY_BASE_KEY],
      });
    },
  });

  const deleteNews = async () => {
    const { message } = await mutateAsync(id);
    return message;
  };

  return { deleteNews, isPending };
}
