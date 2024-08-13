import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io"
      },
      {
        protocol: "http",
        hostname: "odpk.org.ua"
      }
    ]
  }
};

export default withContentlayer(nextConfig);
