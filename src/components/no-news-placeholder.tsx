import { EmptyPlaceholder } from "@/components/empty-placeholder";

export function NoNewsPlaceholder() {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="file" />
      <EmptyPlaceholder.Title>Не вдалось знайти новини</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Спробуйте змінити фільтри, або перевірте пізніше
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  );
}
