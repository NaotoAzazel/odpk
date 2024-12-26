import { ApiSuccessKey, ApiSuccessValue } from "@/types/api/success";

export const API_SUCCESS: Record<ApiSuccessKey, ApiSuccessValue> = {
  SUCCESS: "Успіх",

  // users
  USER_CREATED_SUCCESSFULLY: "Користувача успішно створено",
  USER_DELETED_SUCCESSFULLY: "Користувача успішно видалено",

  // pages
  PAGE_CREATED_SUCCESSFULLY: "Сторінку успішно створено",
  PAGE_DELETED_SUCCESSFULLY: "Сторінку успішно видалено",
  PAGE_UPDATED_SUCCESSFULLY: "Сторінку успішно оновлено",

  // news
  NEWS_ITEM_CREATED_SUCCESSFULLY: "Новину успішно створено",
  NEWS_ITEM_DELETED_SUCCESSFULLY: "Новину успішно видалено",
  NEWS_ITEM_UPDATED_SUCCESSFULLY: "Новину успішно оновлено",

  // files
  FILES_SUCCESSFULLY_UPLOADED: "Файли успішно завантажено",
  FILE_SUCCESSFULLY_DELETED: "Файл успішно видалено",

  // buttons
  BUTTON_CREATED_SUCCESSFULLY: "Кнопку успішно створено",
  BUTTON_DELETED_SUCCESSFULLY: "Кнопку успішно видалено",
  BUTTON_UPDATED_SUCCESSFULLY: "Кнопку успішно оновлено",
};
