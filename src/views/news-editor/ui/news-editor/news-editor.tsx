"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { useEditor } from "@/widgets/editor";
import { NewsItemUpdateRequest, newsItemUpdateSchema } from "@/entities/news";
import { formatDate } from "@/shared/lib";
import { Button, Icons } from "@/shared/ui";

import { usePublishNews, useSaveNews } from "../../lib";

export function NewsEditor(newsItem: Post) {
  const { register, handleSubmit } = useForm<NewsItemUpdateRequest>({
    resolver: zodResolver(newsItemUpdateSchema),
    defaultValues: newsItem,
  });

  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const { editorRef } = useEditor(newsItem.content);

  const { handleSaveNews, isSaving } = useSaveNews(editorRef);
  const { handlePublishNews, isPublishing } = usePublishNews();

  const { ref: titleRef, ...rest } = register("title");

  const formattedUpdatedAt = formatDate(newsItem.updatedAt);
  const isInteractionDisabled = isPublishing || isSaving;

  return (
    <div className="my-10 flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <span className="text-muted-foreground">
          Останнє редагування: {formattedUpdatedAt}
        </span>
        <div className="flex flex-row justify-between gap-2">
          <Button
            onClick={handleSubmit(handlePublishNews)}
            variant="outline"
            disabled={newsItem.published || isInteractionDisabled}
            className="w-full md:w-auto"
          >
            {isPublishing && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {newsItem.published ? "Опубліковано" : "Опублікувати"}
          </Button>
          <Button
            onClick={handleSubmit(handleSaveNews)}
            type="submit"
            disabled={isInteractionDisabled}
            className="w-full md:w-auto"
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Зберегти</span>
          </Button>
        </div>
      </div>
      <div className="w-full rounded-md border border-zinc-200 bg-zinc-50 p-4">
        <form
          className="flex w-full flex-col gap-1"
          onSubmit={handleSubmit(handleSaveNews)}
        >
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);

              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            disabled={isInteractionDisabled}
            placeholder="Заголовок"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />

          <div
            id="editor"
            className="flex min-h-[600px] max-w-fit items-start justify-start"
          />
        </form>
      </div>
    </div>
  );
}
