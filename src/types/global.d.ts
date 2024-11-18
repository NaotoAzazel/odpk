import "@prisma/client";

import { Blocks } from "@/types/news";

import { HeaderButtonItem } from ".";

declare global {
  namespace PrismaJson {
    interface Content {
      blocks: Blocks[];
      time: number;
      version: string;
    }

    type HeaderButtonItems = HeaderButtonItem[];
  }
}
