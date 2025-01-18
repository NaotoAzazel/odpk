import { ErrorKey, ErrorValue } from "@/shared/model";

import { unknownError } from "../../constants";

export const ERROR_MESSAGES: Record<ErrorKey, ErrorValue> = {
  // editor
  CANT_SAVE_EDITOR_DATA: "Не вдається зберегти дані редактора",

  // file
  FILE_NOT_FOUND: "Файл не знайдено",
  CANNOT_UPLOAD_MORE_THAN_1_FILE: "Неможливо завантажити більше 1 файлу",
  CANNOT_UPLOAD_MORE_THAN_N_FILES: "Неможливо завантажити більше файлів",
  FILES_CANCELED: "Скасовані файли",

  // feedback
  YOUR_REVIEW_NOT_SUBMITTED: "Ваш відгук не пройшов. Спробуйте ще раз",

  UNKNOWN_ERROR: unknownError,
};
