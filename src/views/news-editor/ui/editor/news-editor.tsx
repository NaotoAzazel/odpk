"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";

import { Content, useEditor } from "@/widgets/editor";
import {
  NewsItemCreateRequest,
  NewsItemValidator,
  updateNewsItemByIdRequest,
} from "@/entities/news";
import { formatDate, showError, showSuccess } from "@/shared/lib";
import {
  API_SUCCESS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/shared/notices";
import { Button, Icons } from "@/shared/ui";

interface NewsEditorProps {
  newsItem: Post;
}

export function NewsEditor({ newsItem }: NewsEditorProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const { editorRef } = useEditor(newsItem.content);
  const router = useRouter();

  const { register, handleSubmit } = useForm<NewsItemCreateRequest>({
    resolver: zodResolver(NewsItemValidator),
    defaultValues: newsItem,
  });

  async function saveNewsItem(data: NewsItemCreateRequest) {
    setIsSaving(true);

    try {
      const blocks = await editorRef.current?.save();
      if (!blocks) {
        throw new Error(ERROR_MESSAGES["CANT_SAVE_EDITOR_DATA"]);
      }

      toggleReadOnlyMode(true);

      const { message } = await updateNewsItemByIdRequest(newsItem.id, {
        ...data,
        content: blocks as Content,
      });

      router.refresh();
      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    } finally {
      setIsSaving(false);
      toggleReadOnlyMode(false);
    }
  }

  async function publisnNewsItem() {
    setIsPublishing(true);

    try {
      toggleReadOnlyMode(true);

      await updateNewsItemByIdRequest(newsItem.id, {
        published: true,
      });

      router.refresh();
      showSuccess(SUCCESS_MESSAGES["NEWS_ITEM_PUBLISHED"]);
    } catch (error) {
      showError(error);
    } finally {
      setIsPublishing(false);
      toggleReadOnlyMode(false);
    }
  }

  const toggleReadOnlyMode = async (readOnly: boolean) => {
    if (editorRef.current) {
      await editorRef.current.readOnly.toggle(readOnly);
    }
  };

  const formattedUpdatedAt = formatDate(newsItem.updatedAt);

  const { ref: titleRef, ...rest } = register("title");

  const isInteractionDisabled = isPublishing || isSaving;

  return (
    <div className="my-10 flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <span className="text-muted-foreground">
          Останнє редагування: {formattedUpdatedAt}
        </span>
        <div className="flex flex-row justify-between gap-2">
          <Button
            onClick={publisnNewsItem}
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
            onClick={handleSubmit(saveNewsItem)}
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
          onSubmit={handleSubmit(saveNewsItem)}
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
            className="flex min-h-[600px] max-w-fit items-start justify-start overflow-hidden"
          />
        </form>
      </div>
    </div>
  );
}
