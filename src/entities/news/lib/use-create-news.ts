import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNewsItemRequest } from "../api";
import { NEWS_QUERY_BASE_KEY } from "./query-keys";

export function useCreateNews() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createNewsItemRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [NEWS_QUERY_BASE_KEY],
      });
    },
  });

  const createNews = async () => {
    const now = new Date().getTime();

    const { data } = await mutateAsync({
      title: "Untitled Post",
      content: {
        blocks: [],
        time: now,
        version: "2.29.1",
      },
      published: false,
    });

    return data.id;
  };

  return { createNews, isPending };
}
