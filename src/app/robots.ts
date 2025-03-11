import { MetadataRoute } from "next";

import { toAbsoluteUrl } from "@/shared/lib";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/news", "/content/"],
      disallow: ["/dashboard/", "/news-editor/", "/page-editor/"],
    },
    sitemap: toAbsoluteUrl("/sitemap.xml"),
  };
}
