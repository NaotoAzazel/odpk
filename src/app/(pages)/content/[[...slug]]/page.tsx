import { PageHeader } from "@/components/layouts/page-header";
import { Mdx } from "@/components/mdx-components";
import { absoluteUrl } from "@/lib/utils";

import { allPages } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params.slug.join("/");
  const page = allPages.find((page) => page.slugAsParams === slug);

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

  const ogUrl = new URL(absoluteUrl("/api/og"));
  ogUrl.searchParams.set("heading", page.title);
  ogUrl.searchParams.set("type", "Інформаційна сторінка");

  return {
    title: page.title,
    openGraph: {
      title: page.title,
      type: "article",
      url: absoluteUrl(page.slug),
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

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({ slug: page.slugAsParams.split("/") }));
}

export default async function Page({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    return notFound();
  }

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10">
      <PageHeader heading={page.title} />
      <Mdx code={page.body.code} />
    </main>
  );
}
