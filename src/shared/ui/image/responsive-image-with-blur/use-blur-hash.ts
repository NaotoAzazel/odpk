"use client";

import { env } from "@/env";
import { useQuery } from "@tanstack/react-query";

interface UseBlurHash {
  src?: string;
  hasError: boolean;
}

export function useBlurHash({ src, hasError }: UseBlurHash) {
  const shouldFetch = !!src && !hasError;
  const baseURL =
    typeof window !== "undefined"
      ? window.location.origin
      : env.NEXT_PUBLIC_APP_URL;

  const {
    data: blurHash,
    isLoading,
    isError,
  } = useQuery({
    queryKey: shouldFetch ? [src] : ["no-fetch"],
    queryFn: () =>
      fetch(`${baseURL}/${src}`).then(async (response) => {
        const arrayBuffer = await response.arrayBuffer();

        const base64 = Buffer.from(arrayBuffer).toString("base64");

        const blurSVG = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 8 5'>
						<filter id='b' color-interpolation-filters='sRGB'>
          	<feGaussianBlur stdDeviation='1' />
        	</filter>
        	<image 
          	preserveAspectRatio='none' 
          	filter='url(#b)' 
            x='0' 
            y='0' 
            height='100%' 
            width='100%' 
            href='data:image/avif;base64,${base64}' 
          />
        </svg>
        `;

        return `data:image/svg+xml;base64,${window.btoa(blurSVG)}`;
      }),
    enabled: shouldFetch,
  });

  return { blurHash, isLoading, isError };
}
