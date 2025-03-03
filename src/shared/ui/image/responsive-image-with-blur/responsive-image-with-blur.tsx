"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

import { PlaceholderImage } from "../placeholder-image";
import { ErrorPlaceholder } from "./error-placeholder";
import { SkeletonPlaceholder } from "./skeleton-placeholder";
import { useBlurHash } from "./use-blur-hash";

interface ResponsiveImageWithBlurProps extends ImageProps {}

export function ResponsiveImageWithBlur({
  src,
  alt,
  className,
  ...otherProps
}: ResponsiveImageWithBlurProps) {
  const [hasError, setHasError] = useState(false);
  const { blurHash, isLoading, isError } = useBlurHash({
    src: src as string,
    hasError,
  });

  if (isLoading) {
    return <SkeletonPlaceholder />;
  }

  if (isError || hasError) {
    return <ErrorPlaceholder />;
  }

  return (
    <>
      {src ? (
        <Image
          onError={() => setHasError(true)}
          src={src}
          className={className}
          placeholder="blur"
          blurDataURL={blurHash}
          alt={alt}
          {...otherProps}
        />
      ) : (
        <PlaceholderImage className="rounded-none border-b" asChild />
      )}
    </>
  );
}
