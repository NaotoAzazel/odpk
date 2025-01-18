"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { REDIRECTS } from "@/shared/constants";
import { showError } from "@/shared/lib";
import { Button, ButtonProps, Icons } from "@/shared/ui";

import { createNewsItemRequest } from "../../api";

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
      router.push(`${REDIRECTS.toNewsEditor}/${data.id}`);
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
