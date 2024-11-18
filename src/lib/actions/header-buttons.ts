import { Prisma } from "@prisma/client";

import {
  deleteCacheValue,
  invalidateCache,
  withCache,
} from "@/lib/actions/cache";
import { db } from "@/lib/db";
import { createCacheKey } from "@/lib/utils";

export async function getHeaderButtonById(buttonId: number) {
  return withCache({
    key: `header-button:${buttonId}`,
    action: async () => {
      const headerButton = await db.headerButtons.findUnique({
        where: { id: buttonId },
      });
      return headerButton;
    },
    expirationInSeconds: 300, // 5 min
    options: { skipCacheOnNull: true },
  });
}

interface GetHeaderButtonsByParamsParams {
  params?: Prisma.HeaderButtonsFindManyArgs;
}

export async function getHeaderButtonsByParams({
  params,
}: GetHeaderButtonsByParamsParams = {}) {
  return withCache({
    key: `header-buttons:${JSON.stringify(params)}`,
    action: async () => {
      const headerButtons = await db.headerButtons.findMany(params);
      return headerButtons;
    },
    expirationInSeconds: 300, // 5 min
    options: { skipCacheOnNull: true },
  });
}

export async function updateButtonByParams(
  params: Prisma.HeaderButtonsUpdateArgs,
) {
  const updatedButton = await db.headerButtons.update(params);

  if (updatedButton) {
    const cacheKey = createCacheKey(`header-button:${updatedButton.id}`);

    await deleteCacheValue(cacheKey);
    await invalidateCache("header-buttons:*");
  }

  return updatedButton;
}

export async function deleteHeaderButtonByParams(
  params: Prisma.HeaderButtonsDeleteArgs,
) {
  const deletedButton = await db.headerButtons.delete(params);

  if (deletedButton) {
    const cacheKey = createCacheKey(`header-button:${deletedButton.id}`);

    await deleteCacheValue(cacheKey);
    await invalidateCache("header-buttons:*");
  }

  return deletedButton;
}
