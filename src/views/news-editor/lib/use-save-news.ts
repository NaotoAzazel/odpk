import EditorJS from "@editorjs/editorjs";

import { Content } from "@/widgets/editor";
import { NewsItemUpdateRequest, useUpdateNews } from "@/entities/news";
import { showError, showSuccess } from "@/shared/lib";
import { API_SUCCESS, ERROR_MESSAGES } from "@/shared/notices";

export function useSaveNews(editorRef: React.RefObject<EditorJS | undefined>) {
  const { updateNews, isPending } = useUpdateNews();

  async function handleSaveNews(data: NewsItemUpdateRequest) {
    try {
      const blocks = await editorRef.current?.save();
      if (!blocks) {
        throw new Error(ERROR_MESSAGES["CANT_SAVE_EDITOR_DATA"]);
      }

      const message = await updateNews({
        ...data,
        content: blocks as Content,
      });
      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    }
  }

  return { handleSaveNews, isSaving: isPending };
}
