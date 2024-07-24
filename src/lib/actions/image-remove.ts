"use server";

import { utapi } from "@/app/server/uploadthing";

export async function imageRemove(imagesUrl: string[] | string) {
  try {
    await utapi.deleteFiles(imagesUrl);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
