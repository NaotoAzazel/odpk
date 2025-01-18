"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  FileUploader,
  UploadFilesSchema,
  uploadFilesSchema,
  useUploadFile,
} from "@/widgets/file-uploader";
import { showError, showSuccess } from "@/shared/lib";
import { SUCCESS_MESSAGES } from "@/shared/notices";
import { Button, DashboardShell, Icons, Title } from "@/shared/ui";

import { MAX_FILES } from "../constants";

export function DashboardUploadFilePage() {
  const { progresses, uploadFiles, isUploading } = useUploadFile("/api/files");
  const router = useRouter();

  const { watch, setValue, getValues, reset, control } =
    useForm<UploadFilesSchema>({
      resolver: zodResolver(uploadFilesSchema),
      defaultValues: {
        files: [],
      },
    });

  async function onSubmit() {
    try {
      await uploadFiles(getValues("files") as File[]);
      reset();
      router.refresh();
      showSuccess(SUCCESS_MESSAGES["FILES_UPLOADED"]);
    } catch (error) {
      showError(error);
    }
  }

  const files = watch("files");

  const isUploadButtonDisabled =
    isUploading ||
    !!control.getFieldState("files").error ||
    getValues("files")?.length === 0;

  return (
    <DashboardShell>
      <Title heading="Додавання файлу" />
      <FileUploader
        value={files}
        onValueChange={(newFiles) => setValue("files", newFiles)}
        disabled={isUploading}
        progresses={progresses}
        multiple={true}
        maxFiles={MAX_FILES}
        accept={{
          "image/*": [],
          "application/pdf": [], // .pdf
          "application/msword": [], // .doc
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            [], // .docx
        }}
      />
      <Button disabled={isUploadButtonDisabled} onClick={onSubmit}>
        {isUploading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.upload className="mr-2 size-4" />
        )}
        Завантажити
      </Button>
    </DashboardShell>
  );
}
