import { ReactNode } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper>
      {children}
    </MaxWidthWrapper>
  );
}