import { getHeaderButtonsByParams } from "@/lib/actions/header-buttons";
import { NoItemsPlaceholder } from "@/components/no-items-plaiceholder";

import { ButtonItem } from "./button-item";

interface ButtonsHolder {
  buttonPromise: ReturnType<typeof getHeaderButtonsByParams>;
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
