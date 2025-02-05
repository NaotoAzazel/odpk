"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { EditorContentSkeleton } from "@/widgets/editor";
import { getPageById, PAGE_QUERY_BASE_KEY } from "@/entities/page";
import { ErrorContainer } from "@/shared/ui";

import { PageEditor } from "./editor";

interface EditorPageProps {
  params: {
    postId: string;
  };
}

export function EditorPage({ params }: EditorPageProps) {
  const {
    data: page,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [PAGE_QUERY_BASE_KEY, params.postId],
    queryFn: () => getPageById(Number(params.postId)),
  });

  if (isLoading) {
    return <EditorContentSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex w-full justify-center py-36">
        <ErrorContainer
          title="Помилка завантаження редактора"
          description="Ми вже працюємо над цією помилкою, спробуйте перзавантажити сторінку"
        />
      </div>
    );
  }

  if (!page) {
    return notFound();
  }

  return <PageEditor {...page} />;
}
