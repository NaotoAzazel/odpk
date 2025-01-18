"use client";

import { useState } from "react";
import { Files } from "@prisma/client";

import { uploadFilesRequest } from "@/entities/file";

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

    try {
      const result = await uploadFilesRequest({
        endpoint,
        files,
        setProgresses,
      });

      setUploadedFiles((prev) => [...prev, ...result.data]);
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
