"use server";

import { HeaderButtons } from "@prisma/client";

import {
  CACHE_OPTIONS,
  db,
  deleteAndInvalidateCache,
  withCache,
} from "@/shared/lib";

import { EXPIRATION_IN_SECONDS } from "../lib";

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
