import { z } from "zod";

import { contentSchema } from "@/shared/model";

export const pageSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Заголовок повинен мiстити в собi мiнiмум 1 символ" })
    .regex(/^(?!\s*$).+/, {
      message: "Заголовок не може складатися лише з пробілів",
    }),
  href: z
    .string()
    .min(1, { message: "Посилання має бути не менше 1 символу" })
    .regex(/^[a-zA-Z0-9/_\-\.]+$/, {
      message:
        "Посилання може містити тільки латинські літери, цифри, '/', '-', '_' і '.'",
    }),
  content: contentSchema,
});

export const pageUpdateSchema = pageSchema.partial().extend({
  id: z.number(),
});
export const pageCreateSchema = pageSchema;

export type PageUpdateRequest = z.infer<typeof pageUpdateSchema>;
export type PageCreateRequest = z.infer<typeof pageSchema>;
