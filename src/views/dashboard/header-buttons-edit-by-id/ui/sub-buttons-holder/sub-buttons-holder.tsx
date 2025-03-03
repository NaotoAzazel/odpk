import { HeaderButtons } from "@prisma/client";

import { NoItemsPlaceholder } from "@/shared/ui";

import { SubButtonView } from "../sub-button-view";

interface SubButtonsHolderProps {
  button: HeaderButtons;
}

export function SubButtonsHolder({ button }: SubButtonsHolderProps) {
  if (!button.items.length) {
    return (
      <NoItemsPlaceholder
        title="Не вдалося знайти елементи кнопки"
        description="Найімовірніше елементів не існує"
      />
    );
  }

  return (
    <div className="divide-y divide-border rounded-md border">
      {button.items.map((subButton, i) => (
        <SubButtonView button={button} subButton={subButton} key={i} />
      ))}
    </div>
  );
}
