"use client"

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PictureProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

export function Picture({
  className,
  src
}: PictureProps) {
  const [error, setError] = useState<boolean>(false);

  if(!src) {
    return <ImageNotFound />;
  }

  return (
    <>
      {error ? <ImageNotFound /> : (
        <Image
          width={1000}
          height={1000}
          src={src}
          alt="Image"
          loading="lazy"
          className={cn(
            "rounded transition blur-sm duration-500",
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