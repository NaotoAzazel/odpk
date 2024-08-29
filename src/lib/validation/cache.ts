import { z } from "zod";

export const cacheCreateRoute = z.object({
  key: z.string(),
  data: z.any(),
});
