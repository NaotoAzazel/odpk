import { ApiErrorKey, ApiErrorValue } from "@/shared/model";

import { unknownError } from "../../constants";

export const API_ERRORS: Record<ApiErrorKey, ApiErrorValue> = {
  NOT_AUTHORIZED: "Ви не авторизовані",
  VALIDATION_ERROR: "Помилка валідації",
  UNKNOWN_ERROR: unknownError,

  // users
  USER_WITH_THIS_EMAIL_EXISTS: "Користувач з таким email вже існує",
  YOU_CANT_DELETE_YOUR_ACCOUNT: "Ви не можете видалити свій обліковий запис",
  USER_WITH_THIS_ID_NOT_FOUND:
    "Користувача з таким ідентифікатором не знайдено",

  // pages
  PAGE_WITH_THIS_HREF_EXISTS: "Сторінка з таким посиланням вже існує",
  PAGE_WITH_THIS_TITLE_EXISTS: "Сторінка з таким заголовком вже існує",
  PAGES_WITH_THIS_ID_NOT_FOUND: "Сторінок з таким ідентифікатором не знайдено",
  EMPTY_HREF: "Порожнє посилання",
  EMPTY_TITLE: "Порожній заголовок",

  // news
  NEWS_WITH_THIS_ID_NOT_FOUND: "Новину з таким ідентифікатором не знайдено",

  // files
  INVALID_CONTENT_TYPE: "Неприпустимий тип даних",
  CANT_SAVE_FILE_TO_DATABASE: "Не вдалося зберегти файл у базу даних",
  CANT_SAVE_FILE_TO_LOCAL_DIRECTORY:
    "Не вдалося зберегти файл у локальну директорію",
  CANT_DELETE_FILE_FROM_DATABASE: "Не вдалося видалити файл із бази даних",
  CANT_DELETE_FILE_FROM_LOCAL_DIRECTORY:
    "Не вдалося видалити файл із локальної директорії",

  // buttons
  BUTTONS_WITH_THIS_ID_NOT_FOUND: "Кнопки з таким ідентифікатором не знайдено",

  // auth
  INVALID_CREDENTIALS: "Невірні дані",
  INCORRECT_PASSWORD_OR_EMAIL: "Неправильний пароль або електронна пошта",
};
