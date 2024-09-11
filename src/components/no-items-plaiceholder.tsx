import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { Icons } from "@/components/icons";

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
