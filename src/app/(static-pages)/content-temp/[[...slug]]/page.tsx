import { notFound } from "next/navigation";

import { getPageByParams } from "@/lib/actions/pages";
import { PageHeader } from "@/components/layouts/page-header";

interface PageProps {
  params: {
    slug: string[];
  };
}

// TODO: add generateMetadata

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
    <main className="relative py-6 lg:gap-10 lg:py-10">
      <PageHeader heading={page.title} />
    </main>
  );
}
