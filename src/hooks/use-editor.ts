"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { Files } from "@prisma/client";
import axios from "axios";

import { redirects } from "@/config/constants";
import { showError } from "@/lib/notification";

export function useEditor<T extends OutputData | undefined>(data?: T) {
  const editorRef = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        placeholder: "Почніть вводити тут...",
        inlineToolbar: ["link", "bold", "italic"],
        data,
        tools: {
          header: Header,
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // I know that there is a "use-upload-files" hook but
                  // it does not work here

                  const formData = new FormData();
                  formData.append("files", file);

                  try {
                    const response = await axios.post("/api/files", formData);
                    const responseData: Files[] = response.data;

                    return {
                      success: true,
                      file: {
                        url: `${redirects.toFilePreview}/${responseData[0].name}`,
                      },
                    };
                  } catch (error) {
                    showError(error);
                    return {
                      success: false,
                      file: {
                        url: "",
                      },
                    };
                  }
                },
              },
            },
          },
        },
        i18n: {
          messages: {
            ui: {
              blockTunes: {
                toggler: {
                  "Click to tune": "Натисніть, щоб налаштувати",
                  "or drag to move": "або перетягніть",
                },
              },
              popover: {
                Filter: "Пошук...",
                "Nothing found": "Нічого не знайдено...",
                "Convert to": "Перетворити в",
              },
              toolbar: {
                toolbox: {
                  Add: "Додати",
                },
              },
            },
            toolNames: {
              Text: "Абзац",
              Heading: "Заголовок",
              List: "Список",
              Image: "Зображення",
              Bold: "Напівжирний",
              Italic: "Курсив",
              Link: "Посилання",
              ConvertTo: "123",
            },
            tools: {
              header: {
                "Heading 1": "Рівень 1",
                "Heading 2": "Рівень 2",
                "Heading 3": "Рівень 3",
                "Heading 4": "Рівень 4",
                "Heading 5": "Рівень 5",
                "Heading 6": "Рівень 6",
              },
              image: {
                Caption: "Підпис",
                "Select an Image": "Виберіть файл",
                "With border": "Додати рамку",
                "Stretch image": "Розтягнути",
                "With background": "З фоном",
              },
              link: {
                "Add a link": "Вставте посилання",
              },
              list: {
                Ordered: "Нумерований",
                Unordered: "Маркований",
              },
            },
            blockTunes: {
              delete: {
                Delete: "Видалити",
              },
              moveUp: {
                "Move up": "Перемістити вгору",
              },
              moveDown: {
                "Move down": "Перемістити вниз",
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
