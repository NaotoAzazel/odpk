import { toast } from "sonner";
import { z } from "zod";

import { unknownError } from "@/config/constants";

function getErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.errors[0]?.message ?? unknownError;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return unknownError;
  }
}

function showError(error: unknown) {
  const errorMessage = getErrorMessage(error);
  console.log({ errorMessage });

  return toast.error(errorMessage);
}

function showSuccess(message: string) {
  return toast.success(message);
}

export { showError, showSuccess };
