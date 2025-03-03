"use client";

import { useRouter } from "next/navigation";

import { REDIRECTS } from "@/shared/constants";
import { showError } from "@/shared/lib";
import { Button, ButtonProps, Icons } from "@/shared/ui";

import { useCreatePage } from "../../lib";

interface PageCreateButtonProps extends ButtonProps {}

export function PageCreateButton({
  className,
  variant,
  ...props
}: PageCreateButtonProps) {
  const { createPage, isPending } = useCreatePage();

  const router = useRouter();

  async function handleCreatePage() {
    try {
      const createdPageId = await createPage();
      router.push(`${REDIRECTS.toPageEditor}/${createdPageId}`);
    } catch (error) {
      showError(error);
    }
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleCreatePage}
      className={className}
      variant="outline"
      {...props}
    >
      {isPending ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.plus className="mr-2 h-4 w-4" />
      )}
      <span>Сторінка</span>
    </Button>
  );
}
