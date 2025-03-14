import { z } from "zod";

import { contentSchema } from "@/shared/model";

export const NewsItemValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Заголовок повинен мiстити в собi мiнiмум 1 символ" })
    .regex(/^(?!\s*$).+/, {
      message: "Заголовок не може складатися лише з пробілів",
    }),
  content: contentSchema,
  published: z.boolean(),
});
export type NewsItemCreateRequest = z.infer<typeof NewsItemValidator>;

export const newsItemUpdateSchema = NewsItemValidator.partial().extend({
  id: z.number(),
});
export type NewsItemUpdateRequest = z.infer<typeof newsItemUpdateSchema>;

export const newsItemCreateSchema = NewsItemValidator;
