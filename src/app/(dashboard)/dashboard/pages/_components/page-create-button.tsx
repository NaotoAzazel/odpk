"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StaticPages } from "@prisma/client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface PageCreateButtonProps extends ButtonProps {}

export function PageCreateButton({
  className,
  variant,
  ...props
}: PageCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  async function onClick() {
    try {
      setIsLoading(true);

      const now = new Date().getTime();

      const response = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled page",
          href: now.toString(),
          content: {
            blocks: [],
            time: now,
            version: "2.29.1",
          },
        }),
      });

      if (!response?.ok) {
        throw new Error("Виникла помилка під час створення, спробуйте пізніше");
      }

      const createdPage: StaticPages = await response.json();

      router.refresh();
      router.push(`/page-editor/${createdPage.id}`);
    } catch (error) {
      if (error instanceof Error) {
        return toast({
          title: "Щось пiшло не так",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      className={className}
      variant="outline"
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.plus className="mr-2 h-4 w-4" />
      )}
      <span>Сторінка</span>
    </Button>
  );
}
