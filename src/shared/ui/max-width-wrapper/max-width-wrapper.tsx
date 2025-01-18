import { cn } from "@/shared/lib/tailwind-merge/tailwind-merge";

interface MaxWidthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MaxWidthWrapper({
  className,
  children,
  ...props
}: MaxWidthWrapperProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-5 md:px-10", className)}
      {...props}
    >
      {children}
    </div>
  );
}
