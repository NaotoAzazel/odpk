"use client"

import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PictureProps 
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">  {
    src: string | StaticImageData;
  };

export function Picture({
  className,
  src,
}: PictureProps) {
  const [error, setError] = useState<boolean>(false);

  if(!src) {
    return <ImageNotFound />;
  }

  return (
    <>
      {error ? <ImageNotFound /> : (
        <Image
          fill
          src={src}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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