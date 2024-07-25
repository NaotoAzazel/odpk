"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Picture } from "@/components/picture";
import { LoadingEditorOutput } from "./loading/editor-output-loading";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
    loading: () => <LoadingEditorOutput />,
  }
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
  return <h2 className="font-bold font-heading text-3xl">{data.text}</h2>;
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="flex flex-col">
      <div className="mt-1 h-full w-full relative justify-center flex inset-0 min-h-[15rem]">
        <Picture
          src={src}
          alt="News-image"
          className="object-contain my-auto relative"
        />
      </div>
    </div>
  );
}
