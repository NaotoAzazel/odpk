import { HeaderButtons } from "@prisma/client";
import axios from "axios";

import { ApiErrorResponse } from "@/shared/exceptions";
import {
  ApiErrorResponseWithDetails,
  ApiSuccessResponse,
  ApiSuccessResponseWithData,
} from "@/shared/model";

import {
  HeaderButtonCreationRequest,
  HeaderButtonUpdateRequest,
} from "../model";

export async function createButtonRequest(button: HeaderButtonCreationRequest) {
  const response = await axios
    .post<ApiSuccessResponse>("/api/buttons", button, {
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

export async function updateButtonByIdRequest(
  id: number,
  button: HeaderButtonUpdateRequest,
) {
  const response = await axios
    .patch<ApiSuccessResponse>(`/api/buttons/${id}`, button, {
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

export async function getButtonsRequest() {
  const response = await axios
    .get<ApiSuccessResponseWithData<HeaderButtons[]>>(`/api/buttons`, {
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
