"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { ImageBlock } from "@/types/news";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ResponsiveImage } from "@/components/responsive-image";

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

function CustomImageRenderer({ data }: ImageBlock) {
  const src = data.file.url;
  const base64 = data.file.base64;

  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  const handleImageLoad = (width: number, height: number) => {
    setAspectRatio(width / height);
  };

  return (
    <div className="mb-2 flex flex-col overflow-hidden">
      <AspectRatio ratio={aspectRatio}>
        <ResponsiveImage
          src={src}
          alt="News-image"
          fill
          placeholder={base64 ? "blur" : "empty"}
          blurDataURL={base64}
          loading="eager"
          className="rounded-md blur-md transition-all duration-200"
          sizes="(max-width: 425px) 50vw, 75vw"
          onLoad={({ target }) => {
            const { naturalWidth, naturalHeight, classList } =
              target as HTMLImageElement;
            handleImageLoad(naturalWidth, naturalHeight);

            classList.remove("blur-md");
          }}
        />
      </AspectRatio>
    </div>
  );
}
