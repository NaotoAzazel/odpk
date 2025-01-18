import { z } from "zod";

const baseBlockSchema = z.object({
  id: z.string(),
});

const imageBlockSchema = baseBlockSchema.extend({
  data: z.object({
    file: z.object({
      url: z.string(),
    }),
    caption: z.string(),
    stretched: z.boolean(),
    withBorder: z.boolean(),
    withBackground: z.boolean(),
  }),
  type: z.literal("image"),
});

const listBlockSchema = baseBlockSchema.extend({
  data: z.object({
    items: z.array(z.string()),
    style: z.union([z.literal("ordered"), z.literal("unordered")]),
  }),
  type: z.literal("list"),
});

const headerBlockSchema = baseBlockSchema.extend({
  data: z.object({
    text: z.string(),
    level: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
      z.literal(6),
    ]),
  }),
  type: z.literal("header"),
});

const paragraphBlockSchema = baseBlockSchema.extend({
  data: z.object({
    text: z.string(),
  }),
  type: z.literal("paragraph"),
});

const blocksSchema = z.union([
  imageBlockSchema,
  headerBlockSchema,
  listBlockSchema,
  paragraphBlockSchema,
]);

export const contentSchema = z.object({
  blocks: z.array(blocksSchema),
  time: z.number(),
  version: z.string(),
});
