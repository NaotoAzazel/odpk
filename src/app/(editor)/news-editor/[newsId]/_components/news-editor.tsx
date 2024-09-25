"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Post } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { imageRemove } from "@/lib/actions/image-remove";
import { isImageBlock } from "@/lib/editor";
import { PostCreationRequest, PostValidator } from "@/lib/validation/post";
import { useEditor } from "@/hooks/useEditor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface NewsEditorProps {
  newsItem: Post;
}

export function NewsEditor({ newsItem }: NewsEditorProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const { editorRef } = useEditor(newsItem.content);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: newsItem,
  });

  async function onSubmit(data: PostCreationRequest) {
    setIsSaving(true);

    try {
      const blocks = await editorRef.current?.save();
      if (!blocks) {
        return;
      }

      const imageData = blocks.blocks
        .filter((block) => block.type === "image")
        .map((block) => block.data.file.url);

      const response = await fetch(`/api/news/${newsItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          content: blocks,
        }),
      });

      if (!response?.ok) {
        throw new Error("Новину не збережно. Спробуйте ще раз");
      }

      const initialPostImages: string[] = newsItem.content.blocks
        .filter(isImageBlock)
        .map((block) => block.data.file.url);

      const removed: string[] = initialPostImages.filter(
        (url) => !imageData.includes(url),
      );

      const modifiedRemoved = removed.map((url) => url.split("/")[4]);

      if (removed) {
        const removingStatus = await imageRemove(modifiedRemoved);
        if (!removingStatus.success) {
          throw new Error("Новину не збережно. Спробуйте ще раз");
        }
      }

      setIsSaving(false);

      router.refresh();

      return toast({
        title: "Успіх!",
        description: "Новину було успішно збережено",
      });
    } catch (error) {
      setIsSaving(false);

      if (error instanceof Error) {
        return toast({
          title: "Щось пiшло не так",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  }

  async function publishPost() {
    setIsPublishing(true);

    const response = await fetch(`/api/news/${newsItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        published: true,
      }),
    });

    setIsPublishing(false);

    if (!response?.ok) {
      return toast({
        title: "Щось пiшло не так",
        description: "Новину не опубліковано. Спробуйте ще раз",
        variant: "destructive",
      });
    }

    router.refresh();

    return toast({
      title: "Успіх!",
      description: "Новина була успішно опублікована",
    });
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
              onClick={publishPost}
              variant="outline"
              disabled={newsItem.published || isButtonsDisable}
            >
              {isPublishing && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {newsItem.published ? "Опубліковано" : "Опублікувати"}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
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
