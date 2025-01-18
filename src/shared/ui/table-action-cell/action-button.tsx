"use client";

import Link from "next/link";

import { cn } from "@/shared/lib";
import { Button, ButtonProps, buttonVariants, Icons } from "@/shared/ui";

import { DisplayMode } from "./types";

interface ActionButtonProps extends ButtonProps {
  icon: keyof typeof Icons;
  href?: string;
  text?: string;
  whenChangeDisplayMode: DisplayMode;
  textClassName?: string;
  iconClassName?: string;
}

const displayModeClasses = {
  sm: {
    borderClass: "sm:border-solid",
    marginClass: "sm:mr-0",
    visibilityClass: "sm:hidden",
  },
  md: {
    borderClass: "md:border-solid",
    marginClass: "md:mr-0",
    visibilityClass: "md:hidden",
  },
  lg: {
    borderClass: "lg:border-solid",
    marginClass: "md:mr-0",
    visibilityClass: "lg:hidden",
  },
  xl: {
    borderClass: "xl:border-solid",
    marginClass: "md:mr-0",
    visibilityClass: "xl:hidden",
  },
  "": {
    borderClass: "",
    marginClass: "",
    visibilityClass: "",
  },
};

export function ActionButton({
  icon,
  variant = "outline",
  className,
  href,
  whenChangeDisplayMode = "",
  text,
  onClick,
}: ActionButtonProps) {
  const Icon = Icons[icon];

  const { borderClass, marginClass, visibilityClass } =
    displayModeClasses[whenChangeDisplayMode];

  const commonClasses = cn(
    buttonVariants({ variant }),
    `h-8 p-0 px-2 py-1.5 justify-start border-hidden`,
    borderClass,
    className,
  );

  const iconResult = <Icon className={cn("mr-2 size-4", marginClass)} />;

  const spanResult = (
    <span className={cn("block", visibilityClass)}>{text}</span>
  );

  return href ? (
    <Link href={href} className={commonClasses}>
      {iconResult}
      {text && <>{spanResult}</>}
    </Link>
  ) : (
    <Button variant={variant} className={commonClasses} onClick={onClick}>
      {iconResult}
      {text && <>{spanResult}</>}
    </Button>
  );
}
