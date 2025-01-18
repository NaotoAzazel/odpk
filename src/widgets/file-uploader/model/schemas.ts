import { z } from "zod";

export const uploadFilesSchema = z.object({
  files: z.array(z.instanceof(File)).optional(),
});

export type UploadFilesSchema = z.infer<typeof uploadFilesSchema>;
