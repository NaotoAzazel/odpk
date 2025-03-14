import { toast } from "sonner";

import { ApiErrorResponse } from "@/shared/exceptions";
import { API_ERRORS, ERROR_MESSAGES } from "@/shared/notices";

function getErrorMessage(error: unknown) {
  if (error instanceof ApiErrorResponse) {
    return {
      message: API_ERRORS[error.message] ?? API_ERRORS["UNKNOWN_ERROR"],
      errors: error.errors,
    };
  }

  if (error instanceof Error) {
    return { message: error.message, errors: error };
  }

  if (typeof error === "string") {
    return {
      message: error,
      errors: null,
    };
  }

  return { message: ERROR_MESSAGES["UNKNOWN_ERROR"], errors: error };
}

export function showError(error: unknown) {
  const { message, errors } = getErrorMessage(error);
  console.log("Error message:", message);
  if (!!errors) {
    console.log("Error stack:", { errors });
  }

  return toast.error(message);
}

export function showSuccess(message: string) {
  return toast.success(message);
}
