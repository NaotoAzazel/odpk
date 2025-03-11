import { z } from "zod";

export const dashboardSearchParamsSchema = z.object({
  page: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? 1 : num;
  }, z.number().int().min(1).default(1)),
});

export type DashboardSearchParamsSchema = z.infer<
  typeof dashboardSearchParamsSchema
>;
