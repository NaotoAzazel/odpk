"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Icons,
} from "@/shared/ui";

import { ActionButton } from "./action-button";
import { DeleteButton, EditButton, LinkToButton } from "./action-buttons";
import { ActionButtonWithHref, ActionButtonWithOnClick } from "./types";

interface ButtonLinkType extends ActionButtonWithHref {
  type: "link";
}

interface ButtonEditType extends ActionButtonWithHref {
  type: "edit";
}

interface ButtonDeleteType extends ActionButtonWithOnClick {
  type: "delete";
}

type ActionButton = ButtonLinkType | ButtonEditType | ButtonDeleteType;

interface ActionMenuProps {
  buttons: ActionButton[];
  className?: string;
}

export function ActionMenu({ buttons, className }: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button variant="outline" className="h-8 w-8 p-0">
          <Icons.alignJustify className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex flex-col">
        {buttons.map((button, i) => {
          switch (button.type) {
            case "link":
              return (
                <LinkToButton
                  href={button.href}
                  key={i}
                  whenChangeDisplayMode={button.whenChangeDisplayMode}
                />
              );
            case "edit":
              return (
                <EditButton
                  href={button.href}
                  key={i}
                  whenChangeDisplayMode={button.whenChangeDisplayMode}
                />
              );
            case "delete":
              return (
                <DeleteButton
                  onClick={button.onClick}
                  key={i}
                  whenChangeDisplayMode={button.whenChangeDisplayMode}
                />
              );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
