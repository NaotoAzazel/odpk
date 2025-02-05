import EditorJS from "@editorjs/editorjs";

import { Content } from "@/widgets/editor";
import { PageUpdateRequest, useUpdatePage } from "@/entities/page";
import { showError, showSuccess } from "@/shared/lib";
import { API_SUCCESS, ERROR_MESSAGES } from "@/shared/notices";

export function useSavePage(editorRef: React.RefObject<EditorJS | undefined>) {
  const { updatePage, isPending } = useUpdatePage();

  async function handleSavePage(changedPage: PageUpdateRequest) {
    try {
      const blocks = await editorRef.current?.save();
      if (!blocks) {
        throw new Error(ERROR_MESSAGES["CANT_SAVE_EDITOR_DATA"]);
      }

      const message = await updatePage({
        ...changedPage,
        content: blocks as Content,
      });

      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    }
  }

  return { handleSavePage, isSaving: isPending };
}
