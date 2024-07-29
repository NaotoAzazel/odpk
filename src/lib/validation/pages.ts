import { z } from "zod";

export const newsPageSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export type NewsPageSchema = z.infer<typeof newsPageSchema>;
