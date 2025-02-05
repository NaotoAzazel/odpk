"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaticPages } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { useEditor } from "@/widgets/editor";
import { PageUpdateRequest, pageUpdateSchema } from "@/entities/page";
import { formatDate } from "@/shared/lib";
import { Button, Icons } from "@/shared/ui";

import { useSavePage } from "../../lib";
import { ChangePageHrefPopover } from "../change-page-href-popover";

export function PageEditor(page: StaticPages) {
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const { editorRef } = useEditor(page.content);

  const { handleSavePage, isSaving } = useSavePage(editorRef);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PageUpdateRequest>({
    resolver: zodResolver(pageUpdateSchema),
    defaultValues: page,
  });

  const { ref: titleRef, ...rest } = register("title");

  const formattedUpdatedAt = formatDate(page.updatedAt);

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
            onClick={handleSubmit(handleSavePage)}
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
          onSubmit={handleSubmit(handleSavePage)}
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
              className="flex min-h-[600px] max-w-fit items-start justify-start"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
