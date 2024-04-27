import { z } from "zod";

export const userAuthSchema = z.object({
  email: z
    .string()
    .email({ message: "Неправильна адреса електронної пошти" }),
  password: z
    .string()
    .min(1, { message: "Пароль має містити в собі 1 символ" })
});

export type UserAuthSchema = z.infer<typeof userAuthSchema>;