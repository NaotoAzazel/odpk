"use server";

import { HeaderButtons } from "@prisma/client";

import { CACHE_OPTIONS } from "@/config/cache";
import { deleteAndInvalidateCache, withCache } from "@/lib/actions/cache";
import { db } from "@/lib/db";

const EXPIRATION_IN_SECONDS = 300; // 5 min

export async function getHeaderButtons() {
  return withCache({
    key: `header-buttons:all`,
    action: async () => await db.headerButtons.findMany(),
    expirationInSeconds: EXPIRATION_IN_SECONDS,
    options: CACHE_OPTIONS,
  });
}

export async function getHeaderButtonById(id: number) {
  return withCache({
    key: `header-button:${id}`,
    action: async () => await db.headerButtons.findUnique({ where: { id } }),
    expirationInSeconds: EXPIRATION_IN_SECONDS,
    options: CACHE_OPTIONS,
  });
}

export async function updateButtonById(
  id: number,
  data: Partial<HeaderButtons>,
) {
  await db.headerButtons.update({ where: { id }, data });
  await deleteAndInvalidateCache(`header-button:${id}`, "header-buttons:*");
}

export async function deleteHeaderButtonById(id: number) {
  await db.headerButtons.delete({ where: { id } });
  await deleteAndInvalidateCache(`header-button:${id}`, "header-buttons:*");
}
