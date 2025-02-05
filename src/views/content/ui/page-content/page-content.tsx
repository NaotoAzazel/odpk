"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { EditorOutput } from "@/widgets/editor";
import { getPageByHref, PAGE_QUERY_BASE_KEY } from "@/entities/page";
import { ErrorContainer, Title } from "@/shared/ui";

import { PageContentSkeleton } from "./page-content-skeleton";

interface PageContentProps {
  slug: string;
}

export function PageContent({ slug }: PageContentProps) {
  const {
    data: page,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [PAGE_QUERY_BASE_KEY, slug],
    queryFn: () => getPageByHref(slug),
  });

  if (isLoading) {
    return <PageContentSkeleton />;
  }

  if (isError) {
    return <ErrorContainer title="Помилка завантаження сторінки" />;
  }

  if (!page) {
    return notFound();
  }

  return (
    <>
      <Title heading={page.title} />
      <div id="page-container" className="py-5">
        <EditorOutput content={page.content} />
      </div>
    </>
  );
}
