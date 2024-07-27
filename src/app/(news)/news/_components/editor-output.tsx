"use client";

import { ResponsiveImage } from "@/components/responsive-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { LoadingEditorOutput } from "./loading/editor-output-loading";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
    loading: () => <LoadingEditorOutput />,
  },
);

interface EditorOutputProps extends React.HTMLAttributes<HTMLDivElement> {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  header: CustomHeaderRenderer,
};

export function EditorOutput({ content, className }: EditorOutputProps) {
  return (
    // @ts-ignore
    <Output data={content} className={cn(className)} renderers={renderers} />
  );
}

type HeaderRenderer = {
  text: string;
  level: number;
};

function CustomHeaderRenderer({ data }: { data: HeaderRenderer }) {
  return <h2 className="font-heading text-3xl font-bold">{data.text}</h2>;
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <AspectRatio ratio={16 / 9}>
      <ResponsiveImage src={src} alt="Image" fill className="rounded-md" />
    </AspectRatio>
  );
}
