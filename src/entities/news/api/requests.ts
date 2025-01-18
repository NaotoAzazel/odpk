import axios from "axios";

import { ApiErrorResponse } from "@/shared/exceptions";
import {
  ApiErrorResponseWithDetails,
  ApiSuccessResponse,
  ApiSuccessResponseWithData,
} from "@/shared/model";

import { NewsItemCreateRequest, NewsItemUpdateRequest } from "../model";

export async function createNewsItemRequest(item: NewsItemCreateRequest) {
  const response = await axios
    .post<ApiSuccessResponseWithData<{ id: number }>>("/api/news", item, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      const errorResponse: ApiErrorResponseWithDetails = error.response.data;
      throw new ApiErrorResponse(errorResponse.message, errorResponse.errors);
    });

  return response.data;
}

export async function updateNewsItemByIdRequest(
  id: number,
  item: NewsItemUpdateRequest,
) {
  const response = await axios
    .patch<ApiSuccessResponse>(`/api/news/${id}`, item, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      const errorResponse: ApiErrorResponseWithDetails = error.response.data;
      throw new ApiErrorResponse(errorResponse.message, errorResponse.errors);
    });

  return response.data;
}
