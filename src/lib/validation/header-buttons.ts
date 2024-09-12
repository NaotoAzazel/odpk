import { z } from "zod";

export const HeaderButtonItemValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
  description: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
  href: z.string().optional().default(""),
});

export const HeaderButtonValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
  href: z.string().optional(),
  items: z.array(HeaderButtonItemValidator).default([]),
});

export type HeaderButtonCreationRequest = z.infer<typeof HeaderButtonValidator>;
export type HeaderButtonItemsCreationRequest = z.infer<
  typeof HeaderButtonItemValidator
>;

export const HeaderButtonUpdateValidator = HeaderButtonValidator.partial();

export type HeaderButtonUpdateRequest = z.infer<
  typeof HeaderButtonUpdateValidator
>;

export const HeaderButtonItemCreateValidator = HeaderButtonItemValidator;

export type HeaderButtonItemCreateRequest = z.infer<
  typeof HeaderButtonItemValidator
>;
