export const redirects = {
  toNewsEditor: "/news-editor",
  toPageEditor: "/page-editor",
  toHeaderButtonEdit: "/dashboard/header-buttons/edit",
  toNewsItem: "/news",
  toPageItem: "/content-temp",
} as const;

const ONE_DAY_IN_MINUTES = 86_400;
export const authConfig = {
  sessionMaxAge: ONE_DAY_IN_MINUTES * 30,
};

export const unknownError =
  "Виникла невідома помилка. Будь ласка, спробуйте пізніше.";
