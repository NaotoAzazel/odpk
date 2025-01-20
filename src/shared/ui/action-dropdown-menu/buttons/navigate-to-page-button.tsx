import Link from "next/link";

import { cn } from "@/shared/lib";
import { buttonVariants, Icons } from "@/shared/ui";

interface NavigateToPageButton {
  href: string;
  text?: string;
  icon: keyof typeof Icons;
}

export function NavigateToPageButton({
  href,
  text,
  icon,
}: NavigateToPageButton) {
  const iconMargin = text ? "mr-2" : "mr-0";
  const Icon = Icons[icon];

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: text ? "ghost" : "outline" }),
        "h-8 justify-start p-0 px-2 py-1.5",
      )}
    >
      <Icon className={cn(iconMargin, "size-4")} />
      <span className="block">{text}</span>
    </Link>
  );
}
