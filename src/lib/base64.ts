import { env } from "@/env";

export async function getBase64(src: string) {
  if (typeof src === "undefined") {
    return undefined;
  }

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_APP_URL}/_next/image?url=${encodeURIComponent(src)}&w=16&q=60`,
    );

    if (!response.ok) throw new Error("Network response was not ok");

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

    const toBase64 = (src: string) =>
      typeof window === "undefined"
        ? Buffer.from(src).toString("base64")
        : window.btoa(src);

    return `data:image/svg+xml;base64,${toBase64(blurSVG)}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    return undefined;
  }
}
