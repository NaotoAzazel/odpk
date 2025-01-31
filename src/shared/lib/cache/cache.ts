"use server";

import { createCacheKey, EXPIRATION_IN_SECONDS, redis } from "./";

export async function getCachedValue<T>(key: string): Promise<T | null> {
  const cacheKey = createCacheKey(key);
  return await redis.get<T>(cacheKey);
}

export async function setCachedValue(
  key: string,
  value: string,
  expirationInSeconds: number,
): Promise<void> {
  const cacheKey = createCacheKey(key);
  await redis.set(cacheKey, value, { ex: expirationInSeconds });
}

/**
 * @param {string} cacheKey - The value must be already formatted with `createCacheKey` function
 */
export async function deleteCacheValue(cacheKey: string) {
  await redis.del(cacheKey);
}

export async function invalidateCache(key: string) {
  const cacheKey = createCacheKey(key);
  const keys = await redis.keys(cacheKey);

  if (keys.length) {
    keys.forEach(async (key) => {
      await deleteCacheValue(key);
    });
  }
}

/**
 * @param {string} key - The value must not be formatted with `createCacheKey`
 * function for example -> `page:{id}`
 */
export async function deleteAndInvalidateCache(key: string, pattern: string) {
  const cacheKey = createCacheKey(key);
  await deleteCacheValue(cacheKey);
  await invalidateCache(pattern);
}

interface WithCacheParams<T> {
  key: string;
  action: () => Promise<T>;
  expirationInSeconds?: number;
  options?: {
    skipCacheOnNull?: boolean;
  };
}

export async function withCache<T>({
  key,
  action,
  expirationInSeconds = EXPIRATION_IN_SECONDS,
  options = {},
}: WithCacheParams<T>) {
  const cacheKey = createCacheKey(key);
  const cachedValue = await getCachedValue<T>(cacheKey);

  if (cachedValue) {
    return cachedValue as T;
  }

  const result = await action();

  if (result === null && options.skipCacheOnNull) {
    return result;
  }

  await setCachedValue(key, JSON.stringify(result), expirationInSeconds);
  return result;
}
