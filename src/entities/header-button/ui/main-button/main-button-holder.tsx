"use client";

import { useState } from "react";
import { HeaderButtons } from "@prisma/client";

import { MainButton } from "./main-button";

interface MainButtonHolderProps {
  buttonData: HeaderButtons;
}

export function MainButtonHolder({ buttonData }: MainButtonHolderProps) {
  const [button, setButton] = useState<HeaderButtons>(buttonData);

  const updateButton = (data: { title?: string; href?: string }) => {
    setButton((prevButton) => ({
      ...prevButton,
      ...data,
    }));
  };

  return (
    <div className="space-y-1">
      <p className="text-muted-foreground">Головна кнопка</p>
      <MainButton button={button} onUpdate={updateButton} />
    </div>
  );
}
