import "@prisma/client";

import { Blocks } from "@/shared/model/editorjs";
import { HeaderButtonItem } from "@/shared/model/header-button";

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
