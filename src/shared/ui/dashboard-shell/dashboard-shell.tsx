import { cn } from "@/shared/lib";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-4", className)} {...props}>
      {children}
    </div>
  );
}
