"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaticPages } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";

import { Content, useEditor } from "@/widgets/editor";
import {
  PageCreationRequest,
  PageValidator,
  updatePageByIdRequest,
} from "@/entities/page";
import { formatDate, showError, showSuccess } from "@/shared/lib";
import { API_SUCCESS, ERROR_MESSAGES } from "@/shared/notices";
import { Button, Icons } from "@/shared/ui";

import { ChangePageHrefPopover } from "../change-page-href-popover";

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
    watch,
    setValue,
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
        throw new Error(ERROR_MESSAGES["CANT_SAVE_EDITOR_DATA"]);
      }

      const { message } = await updatePageByIdRequest(page.id, {
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
  };

  const formattedUpdatedAt = formatDate(page.updatedAt);

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="my-10 flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <span className="text-muted-foreground">
          Останнє редагування: {formattedUpdatedAt}
        </span>
        <div className="flex flex-row justify-between gap-2">
          <ChangePageHrefPopover
            isDisable={isSaving}
            isError={!!errors.href}
            value={watch("href")}
            onChange={(e) => setValue("href", e.target.value)}
          />
          <Button
            disabled={isSaving}
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="w-full"
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
              disabled={isSaving}
              placeholder="Заголовок"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            />
            <div
              id="editor"
              className="flex min-h-[600px] max-w-fit items-start justify-start overflow-hidden"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
