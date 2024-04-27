"use client"

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Image from "next/image";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default, 
  {
    ssr: false
  }
);

interface EditorOutputProps 
  extends React.HTMLAttributes<HTMLDivElement> {
  content: any;
};

const renderers = {
  image: CustomImageRenderer,
  header: CustomHeaderRenderer
}

export function EditorOutput({ content, className }: EditorOutputProps) {
  return (
    // @ts-ignore
    <Output 
      data={content}
      className={cn(className)}
      renderers={renderers}
    />
  );
}

type HeaderRenderer = {
  text: string;
  level: number;
};

function CustomHeaderRenderer({ data }: { data: HeaderRenderer }) {
  return (
    <h2 className="font-bold font-heading text-3xl">
      {data.text}
    </h2>
  );
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="mt-1 w-full h-full flex  items-center justify-center min-h-[15rem]">
      <Image 
        width={1000}
        height={1000}
        alt="News-image"
        className="object-contain my-auto"
        src={src}
      />
    </div>
  );
}