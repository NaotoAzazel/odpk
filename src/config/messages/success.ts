import { SuccessKey, SuccessValue } from "@/types";

export const SUCCESS_MESSAGES: Record<SuccessKey, SuccessValue> = {
  // buttons
  BUTTON_ITEM_ADDED: "Додано елемент кнопки",
  BUTTON_ITEM_DELETED: "Елемент кнопки видалено",

  // news
  NEWS_ITEM_PUBLISHED: "Новину опубліковано",

  // auth
  SUCCESSFULLY_LOGIN: "Ви успішно авторизувалися",

  // files
  LINK_TO_FILE_COPIED: "Посилання на файл скопійовано",
  FILES_UPLOADED: "Завантажено",

  // feedback
  YOUR_REVIEW_SUBMITTED: "Ваш відгук успішно відправлено",
};
