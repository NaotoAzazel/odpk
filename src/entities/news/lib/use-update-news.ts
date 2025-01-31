import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNewsItemByIdRequest } from "../api";
import { NewsItemUpdateRequest } from "../model";
import { NEWS_QUERY_BASE_KEY } from "./query-keys";

export function useUpdateNews() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateNewsItemByIdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [NEWS_QUERY_BASE_KEY],
      });
    },
  });

  const updateNews = async (newsItem: NewsItemUpdateRequest) => {
    const { message } = await mutateAsync(newsItem);
    return message;
  };

  return { updateNews, isPending };
}
