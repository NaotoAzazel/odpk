"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaticPages } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { showError, showSuccess } from "@/lib/notification";
import { cn } from "@/lib/utils";
import { PageCreationRequest, PageValidator } from "@/lib/validation/page";
import { useEditor } from "@/hooks/useEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

import { HrefInfoDialog } from "./href-info-dialog";

interface PageEditorProps {
  page: StaticPages;
}

export function PageEditor({ page }: PageEditorProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const { editorRef } = useEditor(page.content);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PageCreationRequest>({
    resolver: zodResolver(PageValidator),
    defaultValues: page,
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        showError((value as { message: string }).message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const onSubmit = async (data: PageCreationRequest) => {
    try {
      setIsSaving(true);

      const blocks = await editorRef.current?.save();
      if (!blocks) {
        throw new Error("Виникла помилка під час збереження даних");
      }

      const response = await fetch(`/api/pages/${page.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          href: data.href,
          content: blocks,
        }),
      });

      if (!response?.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData?.message ||
            "Виникла помилка під час збереження. Спробуйте ще раз",
        );
      }

      router.refresh();
      showSuccess("Новину було успішно збережено");
    } catch (error) {
      showError(error);
    } finally {
      setIsSaving(false);
    }
  };

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="my-10 flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between space-x-2">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/pages">
              <Button
                disabled={isSaving}
                variant="outline"
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
              disabled={isSaving}
              onClick={handleSubmit(onSubmit)}
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

        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-2">
            <Label htmlFor="text">Посилання</Label>
            <Input
              disabled={isSaving}
              type="text"
              {...register("href")}
              className={cn("max-w-fit", {
                "focus-visible:ring-red-500": errors.href,
              })}
              placeholder="href/to/page"
            />
            <HrefInfoDialog />
          </div>
        </div>
      </div>

      <div className="w-full rounded border border-zinc-200 bg-zinc-50 p-4">
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
    </div>
  );
}
