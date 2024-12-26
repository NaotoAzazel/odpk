"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { Content } from "@/types/news";
import { ERROR_MESSAGES } from "@/config/messages/error";
import { SUCCESS_MESSAGES } from "@/config/messages/success";
import { updateNewsItemByIdRequest } from "@/lib/api/actions/news";
import { API_SUCCESS } from "@/lib/api/responses/success-messages";
import { showError, showSuccess } from "@/lib/notification";
import {
  NewsItemCreateRequest,
  NewsItemValidator,
} from "@/lib/validation/post";
import { useEditor } from "@/hooks/use-editor";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

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
    }
  }

  async function publisnNewsItem() {
    setIsPublishing(true);

    try {
      await updateNewsItemByIdRequest(newsItem.id, {
        published: true,
      });

      router.refresh();
      showSuccess(SUCCESS_MESSAGES["NEWS_ITEM_PUBLISHED"]);
    } catch (error) {
      showError(error);
    } finally {
      setIsPublishing(false);
    }
  }

  const { ref: titleRef, ...rest } = register("title");

  const isButtonsDisable = isPublishing || isSaving;

  return (
    <div className="my-10 flex flex-col gap-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <div className="flex w-full items-center gap-2">
          <div className="flex flex-1 items-center">
            <Link href="/dashboard/news">
              <Button
                variant="outline"
                onClick={() => {
                  router.refresh();
                }}
                disabled={isButtonsDisable}
              >
                Назад
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={publisnNewsItem}
              variant="outline"
              disabled={newsItem.published || isButtonsDisable}
            >
              {isPublishing && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {newsItem.published ? "Опубліковано" : "Опублікувати"}
            </Button>
            <Button
              onClick={handleSubmit(saveNewsItem)}
              type="submit"
              className="w-full"
              form="post-form"
              disabled={isButtonsDisable}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Зберегти</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full rounded border border-zinc-200 bg-zinc-50 p-4">
        <form id="post-form" className="w-fit">
          <div className="prose prose-stone dark:prose-invert">
            <TextareaAutosize
              ref={(e) => {
                titleRef(e);

                // @ts-ignore
                _titleRef.current = e;
              }}
              {...rest}
              placeholder="Заголовок"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            />

            <div id="editor" className="min-h-[500px]" />
          </div>
        </form>
      </div>
    </div>
  );
}
