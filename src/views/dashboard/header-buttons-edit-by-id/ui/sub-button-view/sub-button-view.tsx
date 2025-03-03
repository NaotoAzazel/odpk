"use client";

import { HeaderButtons } from "@prisma/client";

import { HeaderButtonItem } from "@/entities/header-button";

import { SubButtonActionsDropdown } from "../sub-button-actions-dropdown";

interface SubButtonViewProps {
  button: HeaderButtons;
  subButton: HeaderButtonItem;
}

export function SubButtonView({ button, subButton }: SubButtonViewProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-row items-center">
        <div className="ml-2 grid gap-1">
          <p className="font-heading font-bold">{subButton.title}</p>
          <div>
            <p className="text-sm text-muted-foreground">
              {subButton.description}
            </p>
          </div>
        </div>
      </div>
      <SubButtonActionsDropdown button={button} subButton={subButton} />
    </div>
  );
}
