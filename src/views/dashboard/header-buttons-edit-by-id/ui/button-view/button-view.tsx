import { HeaderButtons } from "@prisma/client";

import { ButtonEditDialog } from "@/entities/header-button";

interface ButtonViewProps {
  button: HeaderButtons;
}

export function ButtonView({ button }: ButtonViewProps) {
  return (
    <div className="flex items-center justify-between rounded-md border p-4">
      <div className="ml-2 flex flex-row items-center">
        <p className="font-heading font-semibold">{button.title}</p>
      </div>
      <ButtonEditDialog button={button} />
    </div>
  );
}
