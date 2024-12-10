"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

import { uploadFiles } from "@/lib/uploadthing";

export function useEditor<T extends OutputData | undefined>(data?: T) {
  const editorRef = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        placeholder: "Почніть вводити тут...",
        inlineToolbar: true,
        data,
        tools: {
          header: Header,
          list: List,
          table: Table,
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
        },
        onReady() {
          editorRef.current = editor;
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }
    return () => {
      editorRef.current?.destroy();
      editorRef.current = undefined;
    };
  }, [isMounted, initializeEditor]);

  return { editorRef };
}
