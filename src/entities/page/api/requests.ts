import { StaticPages } from "@prisma/client";
import axios from "axios";

import { ApiErrorResponse } from "@/shared/exceptions";
import {
  ApiErrorResponseWithDetails,
  ApiSuccessResponse,
  ApiSuccessResponseWithData,
} from "@/shared/model";

import { PageCreateRequest, PageUpdateRequest } from "../model";

export async function createPageRequest(page: PageCreateRequest) {
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

export async function updatePageByIdRequest(page: PageUpdateRequest) {
  const response = await axios
    .patch<ApiSuccessResponse>(`/api/pages/${page.id}`, page, {
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

export async function deletePageByIdRequest(id: number) {
  const response = await axios
    .delete<ApiSuccessResponse>(`/api/pages/${id}`)
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
