import { MetadataRoute } from "next";

import { redirects } from "@/config/constants";
import { getNews } from "@/lib/actions/news";
import { getPagesByParams } from "@/lib/actions/pages";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsRoutes = (await getNews()).map((news) => ({
    url: absoluteUrl(`${redirects.toNewsItem}/${news.id}`),
    lastModified: new Date().toISOString(),
  }));

  const pagesRoutes = (await getPagesByParams()).map((page) => ({
    url: absoluteUrl(`${redirects.toPageItem}/${page.href}`),
    lastModified: new Date().toISOString(),
  }));

  const routes = ["", "/dashboard/news", "/editor", "/news", "/content"].map(
    (route) => ({
      url: absoluteUrl(route),
      lastModified: new Date().toISOString(),
    }),
  );

  return [...routes, ...newsRoutes, ...pagesRoutes];
}
