import { ZodError } from "zod";

import { ApiError } from "@/shared/exceptions";
import { formatZodError } from "@/shared/lib";
import { ApiSuccessKey } from "@/shared/model";

export function handleApiError(error: unknown): Response {
  if (error instanceof ZodError) {
    const formattedErrors = formatZodError(error.issues);
    return Response.json(
      { message: "VALIDATION_ERROR", errors: formattedErrors },
      { status: 422 },
    );
  }

  if (error instanceof ApiError) {
    return Response.json({ message: error.message }, { status: error.status });
  }

  if (error instanceof Error) {
    return Response.json(
      { message: error.message, errors: error },
      { status: 500 },
    );
  }

  return Response.json(
    { message: "UNKNOWN_ERROR", errors: error },
    { status: 500 },
  );
}

interface ApiResponse {
  message: ApiSuccessKey;
  data?: unknown;
}

export function successResponse(status: number, response: ApiResponse) {
  return Response.json(response, { status });
}
