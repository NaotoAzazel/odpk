import { NewsItemUpdateRequest, useUpdateNews } from "@/entities/news";
import { showError, showSuccess } from "@/shared/lib";
import { SUCCESS_MESSAGES } from "@/shared/notices";

export function usePublishNews() {
  const { updateNews, isPending } = useUpdateNews();

  async function handlePublishNews(data: NewsItemUpdateRequest) {
    try {
      await updateNews({ id: data.id, published: true });
      showSuccess(SUCCESS_MESSAGES["NEWS_ITEM_PUBLISHED"]);
    } catch (error) {
      showError(error);
    }
  }

  return { handlePublishNews, isPublishing: isPending };
}
