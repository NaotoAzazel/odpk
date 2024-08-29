"use server";

import { redis } from "@/lib/redis";
import { createCacheKey } from "@/lib/utils";

export async function getCachedValue<T>(key: string): Promise<T | null> {
  const cacheKey = createCacheKey(key);
  return await redis.get(cacheKey);
}

export async function setCachedValue(
  key: string,
  value: string,
  expirationInSeconds: number,
): Promise<void> {
  const cacheKey = createCacheKey(key);
  await redis.set(cacheKey, value, { ex: expirationInSeconds });
}
