import { Icons } from "@/shared/ui/icons/icons";

import { EmptyPlaceholder } from "./empty-placeholder";

interface NoItemsPlaceholderProps {
  title: string;
  description?: string;
  icon?: keyof typeof Icons;
}

export function NoItemsPlaceholder({
  title,
  description,
  icon = "alertTriangle",
}: NoItemsPlaceholderProps) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name={icon} />
      <EmptyPlaceholder.Title>{title}</EmptyPlaceholder.Title>
      {description && (
        <EmptyPlaceholder.Description>
          {description}
        </EmptyPlaceholder.Description>
      )}
    </EmptyPlaceholder>
  );
}
