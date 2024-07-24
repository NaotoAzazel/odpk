import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Заголовок повинен мiстити в собi мiнiмум 1 символ" }),
  content: z.any(),
  images: z.string().array(),
  published: z.boolean(),
});
export type PostCreationRequest = z.infer<typeof PostValidator>;

export const PostUpdateValidator = PostValidator.partial();
