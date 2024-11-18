import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPageByParams } from "@/lib/actions/pages";
import { absoluteUrl } from "@/lib/utils";
import MaxWidthWrapper from "@/components/max-width-wrapper";

import { PageContent } from "./_components/page-content";
import { Header } from '@/components/header'

interface PageProps {
  params: {
    slug: string[];
  };
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
  ogUrl.searchParams.set("type", "Сторінка");

  return {
    title: page.title,
    openGraph: {
      title: page.title,
      type: "article",
      url: absoluteUrl(page.href),
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

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params.slug.join("/");

  const page = await getPageByParams({
    params: {
      where: {
        href: slug,
      },
    },
  });

  if (!page) null;
  return page;
}

export default async function Page({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="flex h-full w-full">
        <MaxWidthWrapper className="relative my-6 bg-white p-5 xl:rounded-lg">
          <Header heading={page.title} />
          <PageContent pageContent={page.content} />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
