import { PagesContentPage } from "@/views/content";
import { Metadata } from "next";

import { getPageByHref } from "@/entities/page";
import { REDIRECTS } from "@/shared/constants";
import { toAbsoluteUrl } from "@/shared/lib";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params.slug.join("/");
  const page = await getPageByHref(slug);

  if (!page) null;
  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);
  if (!page) {
    return {};
  }

  const ogUrl = new URL(toAbsoluteUrl("/api/og"));
  ogUrl.searchParams.set("heading", page.title);
  ogUrl.searchParams.set("type", "Сторінка");

  return {
    title: page.title,
    openGraph: {
      title: page.title,
      type: "article",
      url: toAbsoluteUrl(`${REDIRECTS.toPageItem}/${page.href}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({ params }: PageProps) {
  return <PagesContentPage params={params} />;
}
