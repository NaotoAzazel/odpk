import { Icons } from "@/shared/ui";

export function ErrorPlaceholder() {
  return (
    <div className="flex size-full bg-muted items-center justify-center rounded-md">
      <Icons.imageError className="size-9 text-muted-foreground" />
    </div>
  );
}
