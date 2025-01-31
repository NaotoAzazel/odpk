"use client";

import { useRouter } from "next/navigation";

import { REDIRECTS } from "@/shared/constants";
import { showError } from "@/shared/lib";
import { Button, ButtonProps, Icons } from "@/shared/ui";

import { useCreateNews } from "../../lib";

interface NewsCreateButtonProps extends ButtonProps {}

export function NewsCreateButton({
  className,
  variant,
  ...props
}: NewsCreateButtonProps) {
  const router = useRouter();

  const { createNews, isPending } = useCreateNews();

  async function handleCreate() {
    try {
      const createdNewsId = await createNews();
      router.push(`${REDIRECTS.toNewsEditor}/${createdNewsId}`);
    } catch (error) {
      showError(error);
    }
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleCreate}
      className={className}
      variant="outline"
      {...props}
    >
      {isPending ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.plus className="mr-2 h-4 w-4" />
      )}
      <span>Новина</span>
    </Button>
  );
}
