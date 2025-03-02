"use client";

import Image, { ImageProps } from "next/image";

import { PlaceholderImage } from "../placeholder-image";

interface ResponsiveImageProps extends ImageProps {}

export function ResponsiveImage({
  src,
  alt,
  className,
  ...otherProps
}: ResponsiveImageProps) {
  return (
    <>
      {src ? (
        <Image src={src} className={className} alt={alt} {...otherProps} />
      ) : (
        <PlaceholderImage className="rounded-none border-b" asChild />
      )}
    </>
  );
}
