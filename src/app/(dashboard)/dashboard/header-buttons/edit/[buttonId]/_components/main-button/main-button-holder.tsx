"use client";

import { useState } from "react";
import { HeaderButtons } from "@prisma/client";

import { MainButton } from "./main-button";

interface MainButtonHolderProps {
  buttonData: HeaderButtons;
}

export function MainButtonHolder({ buttonData }: MainButtonHolderProps) {
  const [button, setButton] = useState<HeaderButtons>(buttonData);

  const updateButtonTitle = (newTitle: string) => {
    setButton((prevButton) => ({
      ...prevButton,
      title: newTitle,
    }));
  };

  return (
    <div className="space-y-1">
      <p className="text-muted-foreground">Головна кнопка</p>
      <MainButton button={button} onUpdateTitle={updateButtonTitle} />
    </div>
  );
}
