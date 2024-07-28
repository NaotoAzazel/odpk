import { getNews } from "@/lib/actions/news";
import { absoluteUrl } from "@/lib/utils";
import { allPages } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsRoutes = (await getNews()).map((news) => ({
    url: absoluteUrl(`/news/${news.id}`),
    lastModified: new Date().toISOString(),
  }));

  const pagesRoutes = allPages.map((page) => ({
    url: absoluteUrl(page.slug),
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
