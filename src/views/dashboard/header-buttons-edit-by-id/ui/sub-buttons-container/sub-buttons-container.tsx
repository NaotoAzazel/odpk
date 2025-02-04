"use client";

import { HeaderButtons } from "@prisma/client";

import { SubButtonAddDialog } from "@/entities/header-button";

import { SubButtonsHolder } from "../sub-buttons-holder";

interface SubButtonsContainerProps {
  button: HeaderButtons;
}

export function SubButtonsContainer({ button }: SubButtonsContainerProps) {
  return (
    <div className="space-y-2">
      <p className="text-muted-foreground">Елементи кнопки</p>
      <SubButtonAddDialog button={button} />
      <SubButtonsHolder button={button} />
    </div>
  );
}
