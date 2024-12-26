import { z } from "zod";

import { contentSchema } from "@/lib/validation/content";

export const PageValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Заголовок повинен мiстити в собi мiнiмум 1 символ" }),
  href: z.string().min(1, { message: "Посилання має бути не менше 1 символу" }),
  content: contentSchema,
});
export type PageCreationRequest = z.infer<typeof PageValidator>;

export const PageUpdateValidator = PageValidator.partial();
export type PageUpdateRequest = z.infer<typeof PageUpdateValidator>;

export const pageCreateSchema = PageValidator;
