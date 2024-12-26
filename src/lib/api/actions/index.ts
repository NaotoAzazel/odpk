import axios from "axios";

import { ApiErrorResponseWithDetails } from "@/types/api/errors";
import { ApiSuccessResponse } from "@/types/api/success";
import { ApiErrorResponse } from "@/lib/api/exceptions";

export async function deleteRequest(endpoint: string) {
  const response = await axios
    .delete<ApiSuccessResponse>(endpoint)
    .catch((error) => {
      const errorResponse: ApiErrorResponseWithDetails = error.response.data;
      throw new ApiErrorResponse(errorResponse.message, errorResponse.errors);
    });

  return response.data;
}
