import { HeaderButtons } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateButtonByIdRequest } from "../api";
import { HeaderButtonUpdateRequest } from "../model";
import { HEADER_BUTTONS_QUERY_BASE_KEY } from "./query-keys";

export function useUpdateHeaderButton() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateButtonByIdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [HEADER_BUTTONS_QUERY_BASE_KEY],
      });
    },
  });

  const updateButton = async (button: HeaderButtonUpdateRequest) => {
    const { message } = await mutateAsync(button);
    return message;
  };

  return { updateButton, isPending };
}
