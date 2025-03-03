"use client";

import { useState } from "react";
import { Files } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FILES_QUERY_BASE_KEY, uploadFilesRequest } from "@/entities/file";

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

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadFilesRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FILES_QUERY_BASE_KEY],
      });
    },
  });

  async function upload(files: File[]) {
    try {
      const result = await mutateAsync({ endpoint, files, setProgresses });
      setUploadedFiles((prev) => [...prev, ...result.data]);
    } catch (error) {
      throw error;
    } finally {
      setProgresses({});
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles: upload,
    isUploading: isPending,
  };
}
