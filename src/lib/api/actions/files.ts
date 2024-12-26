import { Files } from "@prisma/client";
import axios from "axios";

import { ApiErrorResponseWithDetails } from "@/types/api/errors";
import { ApiSuccessResponseWithData } from "@/types/api/success";
import { ApiErrorResponse } from "@/lib/api/exceptions";

interface UploadFilesRequestParams {
  endpoint: string;
  files: File[];
  setProgresses?: (
    value: (prev: Record<string, number>) => Record<string, number>,
  ) => void;
}

export async function uploadFilesRequest({
  endpoint,
  files,
  setProgresses,
}: UploadFilesRequestParams) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await axios
    .post<ApiSuccessResponseWithData<Files[]>>(
      endpoint,
      formData,
      setProgresses && {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;

          setProgresses((prev) => {
            const updatedProgress = { ...prev };
            files.forEach((file) => {
              updatedProgress[file.name] = progress;
            });

            return updatedProgress;
          });
        },
      },
    )
    .catch((error) => {
      const errorResponse: ApiErrorResponseWithDetails = error.response.data;
      throw new ApiErrorResponse(errorResponse.message, errorResponse.errors);
    });

  return response.data;
}
