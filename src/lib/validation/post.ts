import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Заголовок повинен мiстити в собi мiнiмум 1 символ" }),
  content: z.any(),
  images: z.string().array()
});

export type PostCreationRequest = z.infer<typeof PostValidator>;