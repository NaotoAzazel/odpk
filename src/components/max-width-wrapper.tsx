import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps 
  extends React.HTMLAttributes<HTMLDivElement> {};

export default function MaxWidthWrapper({ 
  className,
  children,
  ...props
}: MaxWidthWrapperProps) {
  return (
    <div 
      className={cn("mx-auto w-full max-w-screen-2xl px-5 md:px-10", className)}
      {...props}
    >
      {children}
    </div>
  )
}
