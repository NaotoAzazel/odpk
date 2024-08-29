import { Blocks, ImageBlock } from "@/types/news";

export function isImageBlock(block: Blocks): block is ImageBlock {
  return block.type === "image";
}