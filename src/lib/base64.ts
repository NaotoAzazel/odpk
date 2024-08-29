"use client";

import { env } from "@/env";

export async function getBase64(src: string) {
  if (typeof src === "undefined") {
    return undefined;
  }

  try {
    const cacheKey = `imageHash:${src}`;
    const cacheResponse = await fetch(`/api/cache?key=${cacheKey}`, {
      method: "GET",
    });

    if (!cacheResponse.ok) {
      throw new Error("cacheResponse was not ok");
    }

    const cachedValue = await cacheResponse.json();

    if (cachedValue) {
      return cachedValue;
    }

    const response = await fetch(
      `${env.NEXT_PUBLIC_APP_URL}/_next/image?url=${encodeURIComponent(src)}&w=16&q=60`,
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const blurSVG = `
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%">
				<defs>
					<filter id="blur-filter">
						<feGaussianBlur stdDeviation="10" />
					</filter>
				</defs>
				<image href="data:image/avif;base64,${base64}" width="100%" height="100%" filter="url(#blur-filter)" />
			</svg>
		`;

    const toBase64 = (src: string) =>
      typeof window === "undefined"
        ? Buffer.from(src).toString("base64")
        : window.btoa(src);

    const createCacheResponse = await fetch("/api/cache", {
      method: "POST",
      body: JSON.stringify({
        data: `data:image/svg+xml;base64,${toBase64(blurSVG)}`,
        key: cacheKey,
      }),
    });

    if (!createCacheResponse.ok) {
      throw `Cache for image ${src} not recorded`;
    }

    return `data:image/svg+xml;base64,${toBase64(blurSVG)}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    return undefined;
  }
}
