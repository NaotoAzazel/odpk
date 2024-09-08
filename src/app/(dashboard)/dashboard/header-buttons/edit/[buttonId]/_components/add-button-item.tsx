"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

export function AddButtonItem() {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  return (
    <div
      onClick={() => setIsAdding(true)}
      className={cn(
        "flex items-center justify-between rounded-lg border-2 border-dashed p-4 transition-colors duration-200",
        { "hover:cursor-pointer hover:bg-slate-100": !isAdding },
      )}
    >
      {isAdding ? (
        <div className="flex w-full flex-col space-y-2">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex w-full flex-col space-y-2">
              <Label htmlFor="title">Назва кнопки</Label>
              <Input id="title" type="text" placeholder="Директор" />
            </div>
            <div className="flex w-full flex-col space-y-2">
              <Label htmlFor="description">Опис</Label>
              <Input
                id="description"
                type="text"
                placeholder="Інформація про директора коледжу"
              />
            </div>
            <div className="flex w-full flex-col space-y-2">
              <Label htmlFor="href">Посилання</Label>
              <Input
                id="href"
                type="text"
                placeholder="Посилання/на/сторінку"
              />
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsAdding(false);
              }}
            >
              Відміна
            </Button>
            <Button size="sm">
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Зберегти</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <Icons.plus className="mr-2 size-4" />
          <p className="font-heading font-semibold">Додати елемент</p>
        </div>
      )}
    </div>
  );
}
