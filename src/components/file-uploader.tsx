import { useCallback, useEffect } from "react";
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";

import { ERROR_MESSAGES } from "@/config/messages/error";
import { showError } from "@/lib/notification";
import { cn, formatBytes } from "@/lib/utils";
import { useControllableState } from "@/hooks/use-controllable-state";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";
import { ResponsiveImage } from "@/components/image/responsive-image";

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: File[];
  onValueChange?: (newFiles: File[]) => void;

  /** Progress of the uploaded files. */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps["accept"];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps["maxSize"];

  maxFiles?: DropzoneProps["maxFiles"];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  disabled?: boolean;
}

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    progresses,
    accept = { "image/*": [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        showError(ERROR_MESSAGES["CANNOT_UPLOAD_MORE_THAN_1_FILE"]);
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        showError(
          `${ERROR_MESSAGES["CANNOT_UPLOAD_MORE_THAN_N_FILES"]} (${maxFiles})`,
        );
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        const rejectedFilesName = rejectedFiles
          .map(({ file }) => file.name)
          .join(", ");

        showError(`${ERROR_MESSAGES["FILES_CANCELED"]}: ${rejectedFilesName}`);
      }
    },
    [files, maxFiles, multiple, setFiles],
  );

  function onRemove(index: number) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isDragActive && "border-muted-foreground/50",
              isDisabled && "pointer-events-none opacity-60",
              className,
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <Icons.upload className="size-7 text-muted-foreground" />
                </div>
                <p className="font-medium text-muted-foreground">
                  Скидайте файли сюди
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <Icons.upload className="size-7 text-muted-foreground" />
                </div>
                <div className="space-y-px">
                  <p className="font-medium text-muted-foreground">
                    Перетягніть файли сюди або клацніть, щоб вибрати файли
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Ви можете завантажити
                    {maxFiles > 1
                      ? ` ${maxFiles === Infinity ? "multiple" : maxFiles}
                      файлів (до ${formatBytes(maxSize)} кожен)`
                      : ` файл, що містить ${formatBytes(maxSize)}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {files?.length ? (
        <ScrollArea className="h-fit w-full px-3">
          <div className="max-h-48 space-y-4">
            {files?.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => onRemove(index)}
                progress={progresses?.[file.name]}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex items-center space-x-4">
        <div className="flex flex-1 space-x-4">
          <FilePreviewIcon file={file} />
          <div className="flex w-full flex-col gap-2">
            <div className="space-y-px">
              <p className="line-clamp-1 text-sm font-medium text-foreground/80">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatBytes(file.size)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-7"
            onClick={onRemove}
            disabled={!!progress}
          >
            <Icons.trash className="size-4" />
          </Button>
        </div>
      </div>
      {progress ? <Progress value={progress} /> : null}
    </div>
  );
}

function FilePreviewIcon({ file }: { file: File }) {
  return (
    <>
      {isFileWithPreview(file) ? (
        <>
          {isFileIsImage(file) ? (
            <ResponsiveImage
              src={file.preview}
              alt={file.name}
              width={48}
              height={48}
              loading="lazy"
              className="aspect-square rounded-md object-cover"
            />
          ) : (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted">
              <Icons.file className="size-7" strokeWidth={1} />
            </div>
          )}
        </>
      ) : null}
    </>
  );
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return "preview" in file && typeof file.preview === "string";
}

function isFileIsImage(file: File) {
  return !!file.type.startsWith("image/");
}
