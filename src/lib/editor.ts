import { Blocks, ImageBlock } from "@/types/news";
import { getBase64 } from "@/lib/base64";

export function isImageBlock(block: Blocks): block is ImageBlock {
  return block.type === "image";
}

// TODO: maybe move this logic to api
// and store the base64 code in db
export async function addBase64ToImageBlocks(blocks: Blocks[]) {
  await Promise.all(
    blocks.map(async (block) => {
      if (isImageBlock(block)) {
        const base64 = await getBase64(block.data.file.url);
        block.data.file.base64 = base64;
      }
    }),
  );
}
