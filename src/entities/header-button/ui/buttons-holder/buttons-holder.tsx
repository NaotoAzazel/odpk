import { getHeaderButtons } from "@/entities/header-button";
import { NoItemsPlaceholder } from "@/shared/ui";

import { ButtonItem } from "../button-item";

interface ButtonsHolder {
  buttonPromise: ReturnType<typeof getHeaderButtons>;
}

export async function ButtonsHolder({ buttonPromise }: ButtonsHolder) {
  const buttons = await buttonPromise;

  return (
    <>
      {buttons.length > 0 ? (
        <div className="divide-y divide-border rounded-md border">
          {buttons.map((button, i) => (
            <ButtonItem button={button} key={i} />
          ))}
        </div>
      ) : (
        <NoItemsPlaceholder
          title="Не вдалося знайти кнопки"
          description="На даний момент не створено жодної кнопки"
        />
      )}
    </>
  );
}
