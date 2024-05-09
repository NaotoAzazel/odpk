"use client"

import { Icons } from "@/components/icons";
import { Button, ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";

import { useState } from "react";

interface NewsCreateButtonProps extends ButtonProps {};

export function NewsCreateButton({
  className,
  variant,
  ...props
}: NewsCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { toast } = useToast();
  const router = useRouter();

  async function onClick() {
    try {
      setIsLoading(true);
  
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled Post",
        }),
      });

      setIsLoading(false);

      if(!response?.ok) {
        throw new Error("Новину не вдалося створити. спробуйте пізніше");
      }

      const news = await response.json();

      router.refresh();
      router.push(`/editor/${news.id}`);
    } catch(error ) {
      if(error instanceof Error) {
        toast({
          title: "Щось пiшло не так",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
      ) : (
        <Icons.plus className="mr-2 w-4 h-4" />
      )}
      <span>Новина</span>
    </Button>
  )
}