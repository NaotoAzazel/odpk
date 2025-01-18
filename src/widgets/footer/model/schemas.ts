import { z } from "zod";

export const feedbackSchema = z.object({
  email: z.string().email({ message: "Неправильна адреса електронної пошти" }),
  fullname: z
    .string()
    .min(1, { message: "Поле повинно мати хоча б один символ" })
    .max(50, { message: "Довжина поля не повинна перевищувати 50 символів" }),
  question: z
    .string()
    .min(1, { message: "Поле повинно мати хоча б один символ" })
    .max(2000, {
      message: "Довжина поля не повинна перевищувати 2000 символів",
    }),
});

export type FeedbackSchema = z.infer<typeof feedbackSchema>;
