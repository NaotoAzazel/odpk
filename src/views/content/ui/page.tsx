import { MaxWidthWrapper } from "@/shared/ui";

import { PageContent } from "./page-content";

interface PagesContentPageProps {
  params: {
    slug: string[];
  };
}

export function PagesContentPage({ params }: PagesContentPageProps) {
  const slug = params.slug.join("/");

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="flex h-full w-full">
        <MaxWidthWrapper className="relative my-6 bg-white p-5 xl:rounded-lg">
          <PageContent slug={slug} />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
