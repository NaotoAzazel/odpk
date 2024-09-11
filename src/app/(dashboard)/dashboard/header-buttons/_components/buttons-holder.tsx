import { getHeaderButtonsByParams } from "@/lib/actions/header-buttons";

import { ButtonItem } from "./button-item";

interface ButtonsHolder {
  buttonPromise: ReturnType<typeof getHeaderButtonsByParams>;
}

export async function ButtonsHolder({ buttonPromise }: ButtonsHolder) {
  const buttons = await buttonPromise;

  return (
    <div className="divide-y divide-border rounded-md border">
      {buttons.map((button, i) => (
        <ButtonItem button={button} key={i} />
      ))}
    </div>
  );
}
