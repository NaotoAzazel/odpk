import { EmptyPlaceholder } from "./empty-placeholder";

export function NewsCardsErrorContainer() {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="error" />
      <EmptyPlaceholder.Title>
        Виникла помилка з отримання новин
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Ми вже працює над виправленням цієї помилки
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  );
}
