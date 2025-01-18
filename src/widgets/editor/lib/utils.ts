import { Blocks, ImageBlock } from "../model";

export function isImageBlock(block: Blocks): block is ImageBlock {
  return block.type === "image";
}
