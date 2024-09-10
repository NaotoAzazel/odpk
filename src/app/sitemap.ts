import { MetadataRoute } from "next";

import { getNews } from "@/lib/actions/news";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsRoutes = (await getNews()).map((news) => ({
    url: absoluteUrl(`/news/${news.id}`),
    lastModified: new Date().toISOString(),
  }));

  // TODO: load pagesRoutes from db

  const routes = ["", "/dashboard/news", "/editor", "/news"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...newsRoutes];
}
