import { z } from "zod";

export const headerSubButtonSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
  description: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
  href: z.string().optional().default(""),
});

export const headerButtonSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Це поле має містити в собі хоча б один символ" }),
  items: z.array(headerSubButtonSchema).default([]),
});

export const headerButtonCreateSchema = headerButtonSchema;
export const headerButtonUpdateSchema = headerButtonSchema.partial().extend({
  id: z.number(),
});

export const headerSubButtonCreateSchema = headerSubButtonSchema;
export const headerSubButtonUpdateSchema = headerSubButtonSchema.partial();

export type HeaderButtonCreationRequest = z.infer<typeof headerButtonSchema>;
export type HeaderButtonUpdateRequest = z.infer<
  typeof headerButtonUpdateSchema
>;

export type HeaderSubButtonCreateRequest = z.infer<
  typeof headerSubButtonSchema
>;
export type HeaderSubButtonUpdateRequest = z.infer<
  typeof headerSubButtonUpdateSchema
>;
