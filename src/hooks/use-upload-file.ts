import { useState } from "react";
import { Files } from "@prisma/client";
import axios from "axios";

import { showError } from "@/lib/notification";

interface UseUploadFileProps {
  defaultUploadedFiles?: Files[];
}

export function useUploadFile(
  endpoint: string,
  { defaultUploadedFiles = [] }: UseUploadFileProps = {},
) {
  const [uploadedFiles, setUploadedFiles] =
    useState<Files[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);

  async function upload(files: File[]) {
    setIsUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(endpoint, formData, {
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
      });

      const responseData: Files[] = response.data;
      setUploadedFiles((prev) => [...prev, ...responseData]);
    } catch (error) {
      throw error;
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles: upload,
    isUploading,
  };
}
