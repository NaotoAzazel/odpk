"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SUCCESS_MESSAGES } from "@/config/messages/success";
import { showError, showSuccess } from "@/lib/notification";
import {
  UploadFilesSchema,
  uploadFilesSchema,
} from "@/lib/validation/file-upload";
import { useUploadFile } from "@/hooks/use-upload-file";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/file-uploader";
import { Icons } from "@/components/icons";

const MAX_FILES = 10;

export function FileUploadHolder() {
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
    <>
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
    </>
  );
}
