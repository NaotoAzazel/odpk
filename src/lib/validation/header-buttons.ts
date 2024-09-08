import { z } from "zod";

export const HeaderButtonItemsValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
  description: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
  href: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
});

export const HeaderButtonValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
  items: z.array(HeaderButtonItemsValidator).default([]),
});

export type HeaderButtonCreationRequest = z.infer<typeof HeaderButtonValidator>;
export type HeaderButtonItemsCreationRequest = z.infer<
  typeof HeaderButtonItemsValidator
>;

export const HeaderButtonUpdateValidator = HeaderButtonValidator.partial();

export type HeaderButtonUpdateRequest = z.infer<
  typeof HeaderButtonUpdateValidator
>;
