"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";

import { uploadFiles } from "@/lib/uploadthing";
import { PostCreationRequest, PostValidator } from "@/lib/validation/post";
import { zodResolver } from "@hookform/resolvers/zod";

import { Post } from "@/types";

import EditorJS from "@editorjs/editorjs";
import { imageRemove } from "@/lib/actions/image-remove";

export function Editor({ post }: { post: Post }) {
  const router = useRouter();
  const { toast } = useToast();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: post,
  });

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounter, setIsMounter] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    const body = PostValidator.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Введіть тут, щоб написати новину...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          LinkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles("imageUploader", {
                    files: [file],
                  });

                  return {
                    success: true,
                    file: {
                      url: res.url,
                    },
                  };
                },
              },
            },
          },
          list: List,
          table: Table,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounter(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Щось пiшло не так",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounter) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounter, initializeEditor]);

  async function onSubmit(data: PostCreationRequest) {
    setIsSaving(true);

    try {
      const blocks = await ref.current?.save();
      if (!blocks) {
        return;
      }

      const imageData = blocks.blocks
        .filter((block) => block.type === "image")
        .map((block) => block.data.file.url);

      const response = await fetch(`/api/news/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          content: blocks,
          images: imageData,
        }),
      });

      if (!response?.ok) {
        throw new Error("Новину не збережно. Спробуйте ще раз");
      }

      const initialPostImages: string[] = post.images;
      const removed: string[] = initialPostImages.filter(
        (url) => !imageData.includes(url)
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
        description: "Новину збережено",
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

    const response = await fetch(`/api/news/${post.id}`, {
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
      description: "Новину опубліковано",
    });
  }

  const { ref: titleRef, ...rest } = register("title");

  const isButtonsDisable = isPublishing || isSaving;

  return (
    <>
      <div className="flex w-full items-center justify-between space-x-2">
        <div className="flex w-full items-center gap-2">
          <div className="flex flex-1 items-center">
            <Link href="/dashboard/news">
              <Button
                variant="outline"
                disabled={isButtonsDisable}
                onClick={() => {
                  router.refresh();
                }}
              >
                Назад
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={publishPost}
              disabled={post.published || isButtonsDisable}
              variant="outline"
            >
              {isPublishing && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {post.published ? "Опубліковано" : "Опублікувати"}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isButtonsDisable}
              type="submit"
              className="w-full"
              form="post-form"
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Зберегти</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-zinc-50 rounded border border-zinc-200">
        <form
          id="post-form"
          className="w-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
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
    </>
  );
}
