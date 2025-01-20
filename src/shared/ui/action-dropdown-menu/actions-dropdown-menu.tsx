"use client";

import { ReactNode } from "react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Icons,
} from "@/shared/ui";

interface ActionsDropdownMenuProps {
  actionSlot: ReactNode;
}

export function ActionsDropdownMenu({ actionSlot }: ActionsDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 p-0">
          <Icons.alignJustify className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex flex-col">
        {actionSlot}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
