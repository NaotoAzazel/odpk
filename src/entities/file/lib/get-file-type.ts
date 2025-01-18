import { FileTypes } from "@prisma/client";

export function getFileType(file: File): FileTypes {
  return file.type.startsWith("image/") ? "IMAGE" : "DOCUMENT";
}
