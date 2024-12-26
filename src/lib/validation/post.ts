import { z } from "zod";

import { contentSchema } from "@/lib/validation/content";

export const NewsItemValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Заголовок повинен мiстити в собi мiнiмум 1 символ" }),
  content: contentSchema,
  published: z.boolean(),
});
export type NewsItemCreateRequest = z.infer<typeof NewsItemValidator>;

export const newsItemUpdateSchema = NewsItemValidator.partial();
export type NewsItemUpdateRequest = z.infer<typeof newsItemUpdateSchema>;

export const newsItemCreateSchema = NewsItemValidator;
