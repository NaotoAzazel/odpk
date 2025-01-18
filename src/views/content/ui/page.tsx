import { notFound } from "next/navigation";

import { getPageByHref } from "@/entities/page";
import { MaxWidthWrapper, Title } from "@/shared/ui";

import { PageContent } from "./page-content";

interface PagesContentPageProps {
  params: {
    slug: string[];
  };
}

export async function PagesContentPage({ params }: PagesContentPageProps) {
  const slug = params.slug.join("/");
  const page = await getPageByHref(slug);

  if (!page) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <section className="flex h-full w-full">
        <MaxWidthWrapper className="relative my-6 bg-white p-5 xl:rounded-lg">
          <Title heading={page.title} />
          <PageContent pageContent={page.content} />
        </MaxWidthWrapper>
      </section> */}
    </div>
  );
}
