"use client";

import { cn } from "@/shared/lib";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";

interface ChangePageHrefPopoverProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisable: boolean;
  isError: boolean;
}

export function ChangePageHrefPopover({
  isDisable,
  isError,
  ...props
}: ChangePageHrefPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Змінити посилання</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-3">
          <div>
            <h4 className="font-heading font-bold">Редагування посилання</h4>
            <p className="text-sm text-muted-foreground">
              Повинно бути унікальним
            </p>
          </div>
          <div>
            <Input
              autoFocus={true}
              type="text"
              className={cn("h-8", { "focus-visible:ring-red-500": isError })}
              placeholder="document/rocklad-dzvinkiv"
              disabled={isDisable}
              {...props}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
