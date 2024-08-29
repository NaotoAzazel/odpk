"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image, { ImageProps } from "next/image";

import { getBase64 } from "@/lib/base64";
import { PlaceholderImage } from "@/components/placeholder-image";

interface BlurImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

export function BlurImage({
  src,
  alt,
  className,
  ...otherProps
}: BlurImageProps) {
  const [hash, setHash] = useState<string | undefined>();

  const fetchImage = useCallback(async () => {
    try {
      const blurhash = await getBase64(src);
      setHash(blurhash);
    } catch (error) {
      console.error("Error fetching image:", error);
      setHash(undefined);
    }
  }, [src]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const memoizedHash = useMemo(() => hash, [hash]);

  if (!src) {
    return <PlaceholderImage className="rounded-none border-b" asChild />;
  }

  return (
    <>
      <Image
        src={src}
        className={className}
        alt={alt}
        fill
        placeholder={memoizedHash ? "blur" : "empty"}
        blurDataURL={memoizedHash}
        {...otherProps}
      />
    </>
  );
}
