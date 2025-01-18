import { StaticPages } from "@prisma/client";
import axios from "axios";

import { ApiErrorResponse } from "@/shared/exceptions";
import {
  ApiErrorResponseWithDetails,
  ApiSuccessResponse,
  ApiSuccessResponseWithData,
} from "@/shared/model";

import { PageCreationRequest, PageUpdateRequest } from "../model";

export async function createPageRequest(page: PageCreationRequest) {
  const response = await axios
    .post<ApiSuccessResponseWithData<{ id: number }>>("/api/pages", page, {
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

export async function updatePageByIdRequest(
  id: number,
  page: PageUpdateRequest,
) {
  const response = await axios
    .patch<ApiSuccessResponse>(`/api/pages/${id}`, page, {
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

export async function getPagesRequest() {
  const response = await axios
    .get<ApiSuccessResponseWithData<StaticPages[]>>(`/api/pages`, {
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
