"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { REDIRECTS } from "@/shared/constants";
import { showError } from "@/shared/lib";
import { Button, ButtonProps, Icons } from "@/shared/ui";

import { createPageRequest } from "../../api";

interface PageCreateButtonProps extends ButtonProps {}

export function PageCreateButton({
  className,
  variant,
  ...props
}: PageCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function onClick() {
    try {
      setIsLoading(true);

      const now = new Date().getTime();

      const { data } = await createPageRequest({
        title: `Generated title ${now}`,
        href: now.toString(),
        content: {
          blocks: [],
          time: now,
          version: "2.29.1",
        },
      });

      router.refresh();
      router.push(`${REDIRECTS.toPageEditor}/${data.id}`);
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
      <span>Сторінка</span>
    </Button>
  );
}
