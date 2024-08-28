import withPlaiceholder from "@plaiceholder/next";
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "http",
        hostname: "odpk.org.ua",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [20, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [20, 16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
};

export default withPlaiceholder(withContentlayer(nextConfig));
