import { env } from "@/env";

export const createCacheKey = (key: string) => `${key}:${env.NODE_ENV}`;
