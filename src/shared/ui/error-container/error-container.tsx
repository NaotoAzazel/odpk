import { EmptyPlaceholder } from "../placeholder";

interface ErrorContainerProps {
  title: string;
  description?: string;
}

export function ErrorContainer({ title, description }: ErrorContainerProps) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="error" />
      <EmptyPlaceholder.Title>{title}</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        {description ?? "Ми вже працює над виправленням цієї помилки"}
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  );
}
