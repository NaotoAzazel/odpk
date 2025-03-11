import { MetadataRoute } from "next";

import { getNews } from "@/entities/news";
import { getPages } from "@/entities/page";
import { REDIRECTS } from "@/shared/constants";
import { toAbsoluteUrl } from "@/shared/lib";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsRoutes = (await getNews()).map((news) => ({
    url: toAbsoluteUrl(`${REDIRECTS.toNewsItem}/${news.id}`),
    lastModified: new Date().toISOString(),
  }));

  const pagesRoutes = (await getPages()).map((page) => ({
    url: toAbsoluteUrl(`${REDIRECTS.toPageItem}/${page.href}`),
    lastModified: new Date().toISOString(),
  }));

  const publicRoutes = ["", "/news", "/content"].map((route) => ({
    url: toAbsoluteUrl(route),
    lastModified: new Date().toISOString(),
  }));

  return [...publicRoutes, ...newsRoutes, ...pagesRoutes];
}
