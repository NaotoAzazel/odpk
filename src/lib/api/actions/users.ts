import axios from "axios";

import { ApiErrorResponseWithDetails } from "@/types/api/errors";
import { ApiSuccessResponse } from "@/types/api/success";
import { ApiErrorResponse } from "@/lib/api/exceptions";
import { UserAuthSchema } from "@/lib/validation/auth";

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
