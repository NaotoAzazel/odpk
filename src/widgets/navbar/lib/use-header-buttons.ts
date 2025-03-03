import { useQuery } from "@tanstack/react-query";

import {
  getHeaderButtons,
  HEADER_BUTTONS_QUERY_BASE_KEY,
} from "@/entities/header-button";

interface UseHeaderButtonsProps {
  enabled?: boolean;
}

export function useHeaderButtons({
  enabled = true,
}: UseHeaderButtonsProps = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [HEADER_BUTTONS_QUERY_BASE_KEY, "all"],
    queryFn: () => getHeaderButtons(),
    enabled,
  });

  return { data, isLoading, isError };
}
