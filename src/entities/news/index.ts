export {
  deleteNewsItemById,
  getAnotherNews,
  getNews,
  getNewsForPagination,
  getNewsItemById,
  getPublishedNews,
  updateNewsById,
  createNewsItemRequest,
  updateNewsItemByIdRequest,
  deleteNewsItemByIdRequest,
  type GetNewsForPaginationResult,
  type Metadata,
} from "./api";

export {
  NewsItemValidator,
  newsItemCreateSchema,
  newsItemUpdateSchema,
  type NewsItemCreateRequest,
  type NewsItemUpdateRequest,
} from "./model";

export { NewsCreateButton, NewsDeleteDialog } from "./ui";

export { NEWS_PER_PAGE, NEWS_QUERY_BASE_KEY, useUpdateNews } from "./lib";
