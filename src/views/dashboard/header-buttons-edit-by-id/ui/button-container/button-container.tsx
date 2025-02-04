"use client";

import { HeaderButtons } from "@prisma/client";

import { ButtonView } from "../button-view";

interface ButtonContainerProps {
  button: HeaderButtons;
}

export function ButtonContainer({ button }: ButtonContainerProps) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground">Головна кнопка</p>
      <ButtonView button={button} />
    </div>
  );
}
