import { HeaderButtons } from "@prisma/client";

import { Operations } from "./operations";

interface ButtonItem {
  button: HeaderButtons;
}

export function ButtonItem({ button }: ButtonItem) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <p className="font-heading font-semibold">{button.title}</p>
      </div>
      <Operations data={button} />
    </div>
  );
}
