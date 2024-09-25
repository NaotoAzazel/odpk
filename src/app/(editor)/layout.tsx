import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
}
