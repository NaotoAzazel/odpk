"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { redirects } from "@/config/constants";
import { createNewsItemRequest } from "@/lib/api/actions/news";
import { showError } from "@/lib/notification";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface NewsCreateButtonProps extends ButtonProps {}

export function NewsCreateButton({
  className,
  variant,
  ...props
}: NewsCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function onClick() {
    try {
      const now = new Date().getTime();

      setIsLoading(true);

      const { data } = await createNewsItemRequest({
        title: "Untitled Post",
        content: {
          blocks: [],
          time: now,
          version: "2.29.1",
        },
        published: false,
      });

      router.refresh();
      router.push(`${redirects.toNewsEditor}/${data.id}`);
    } catch (error) {
      showError(error);
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
      <span>Новина</span>
    </Button>
  );
}
