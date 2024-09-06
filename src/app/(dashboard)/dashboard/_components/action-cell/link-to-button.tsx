import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface LinkToProps {
  href: string;
}

export function LinkTo({ href }: LinkToProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "outline" }), "h-8 w-8 p-0")}
    >
      <Icons.openLink className="h-4 w-4" />
    </Link>
  );
}
