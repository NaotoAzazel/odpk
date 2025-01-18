import { MaxWidthWrapper } from "@/shared/ui";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
}
