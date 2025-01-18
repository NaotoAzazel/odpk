import { MetadataRoute } from "next";

import { toAbsoluteUrl } from "@/shared/lib";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: toAbsoluteUrl("/sitemap.xml"),
  };
}
