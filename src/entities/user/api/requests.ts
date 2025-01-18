import axios from "axios";

import { ApiErrorResponse } from "@/shared/exceptions";
import {
  ApiErrorResponseWithDetails,
  ApiSuccessResponse,
} from "@/shared/model";

import { UserAuthSchema } from "../model";

export async function createUserRequest(user: UserAuthSchema) {
  const response = await axios
    .post<ApiSuccessResponse>("/api/users", user, {
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
