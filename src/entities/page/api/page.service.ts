"use server";

import { StaticPages } from "@prisma/client";

import {
  CACHE_OPTIONS,
  db,
  deleteAndInvalidateCache,
  withCache,
} from "@/shared/lib";

export async function getPages() {
  return withCache({
    key: "pages:all",
    action: async () => await db.staticPages.findMany(),
    options: CACHE_OPTIONS,
  });
}

export async function getPageById(id: number) {
  return withCache({
    key: `page:${id}`,
    action: async () => await db.staticPages.findUnique({ where: { id } }),
    options: CACHE_OPTIONS,
  });
}

export async function getPageByHref(href: string) {
  return withCache({
    key: `page:${href}`,
    action: async () => await db.staticPages.findUnique({ where: { href } }),
    options: CACHE_OPTIONS,
  });
}

export async function getPageByTitle(title: string) {
  return withCache({
    key: `page:${title}`,
    action: async () => await db.staticPages.findUnique({ where: { title } }),
    options: CACHE_OPTIONS,
  });
}

export async function updatePageById(id: number, data: Partial<StaticPages>) {
  await db.staticPages.update({ where: { id }, data });
  await deleteAndInvalidateCache(`page:${id}`, "pages:*");
}

export async function deletePageById(id: number) {
  await db.staticPages.delete({ where: { id } });
  await deleteAndInvalidateCache(`page:${id}`, "pages:*");
}
