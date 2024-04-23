import { Mdx } from "@/components/mdx-components";
import { PageHeader } from "@/components/layouts/page-header";

import { allPages } from "contentlayer/generated";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string[];
  };
};

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params.slug?.join("/") || "";
  const pages = allPages.find((page) => page.slugAsParams === slug);

  if(!pages) return notFound();
  return pages;
}

export async function generateStaticParams(): Promise<
  PageProps["params"][]
> {
  return allPages.map((page) => ({ slug: page.slugAsParams.split("/") }));
}

export default async function Page({ params }: PageProps) {
  const page = await getPageFromParams(params);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10">
      <PageHeader heading={page.title} />
      <Mdx code={page.body.code} />
    </main>
  )
}