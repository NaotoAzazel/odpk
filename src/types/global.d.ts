import "@prisma/client";

import { Blocks } from "@/types/news";

declare global {
  namespace PrismaJson {
    interface Content {
      blocks: Blocks[];
      time: number;
      version: string;
    };
  }
}
