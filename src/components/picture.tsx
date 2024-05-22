"use client"

import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PictureProps 
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">  {
    src: string | StaticImageData;
    widht?: number;
    height?: number;
  };

export function Picture({
  className,
  src,
  widht = 1000,
  height = 1000
}: PictureProps) {
  const [error, setError] = useState<boolean>(false);

  if(!src) {
    return <ImageNotFound />;
  }

  return (
    <>
      {error ? <ImageNotFound /> : (
        <Image
          src={src}
          width={widht}
          height={height}
          alt="Image"
          loading="lazy"
          className={cn(
            "rounded",
            className
          )}
          onError={() => setError(true)}
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.classList.remove("blur-sm");
          }}
        />
      )}
    </>
  );
}

function ImageNotFound() {
  return (
    <div className="flex w-full text-center items-center">
      <p className="text-muted-foreground text-sm w-full">
        Картинку не знайдено
      </p>
    </div>
  );
}