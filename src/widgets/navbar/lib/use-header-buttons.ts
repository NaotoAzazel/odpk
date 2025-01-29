import { useQuery } from "@tanstack/react-query";

import { getHeaderButtons } from "@/entities/header-button";

interface UseHeaderButtonsProps {
  enabled?: boolean;
}

export function useHeaderButtons({
  enabled = true,
}: UseHeaderButtonsProps = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["buttons", "header"],
    queryFn: () => getHeaderButtons(),
    enabled,
  });

  return { data, isLoading, isError };
}
