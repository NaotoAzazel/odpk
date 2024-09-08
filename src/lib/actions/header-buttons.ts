import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

export async function deleteHeaderButtonByParams(
  params: Prisma.HeaderButtonsDeleteArgs,
) {
  // TODO: add caching
  const deletedPage = await db.headerButtons.delete(params);
  return deletedPage;
}
