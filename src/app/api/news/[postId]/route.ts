import { getServerSession } from "next-auth";
import { z } from "zod";

import { imageRemove } from "@/lib/actions/image-remove";
import {
  deleteNewsItemById,
  getNewsById,
  updateNewsByParams,
} from "@/lib/actions/news";
import { authOptions } from "@/lib/auth";
import { isImageBlock } from "@/lib/editor";
import { newsItemUpdateSchema } from "@/lib/validation/post";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const deletedNews = await deleteNewsItemById({
      newsItemId: parseInt(params.postId),
    });
    if (!deletedNews) {
      throw new Error(`Failed to delete news with id: ${params.postId}`);
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const json = await req.json();
    const data = newsItemUpdateSchema.parse(json);

    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const imageData = data.content?.blocks
      .filter(isImageBlock)
      .map((block) => block.data.file.url);

    if (imageData?.length) {
      const newsItem = await getNewsById({ postId: parseInt(params.postId) });
      if (!newsItem) {
        throw new Error(`Cant reach news item with id: ${params.postId}`);
      }

      const initialPostImages = newsItem.content.blocks
        .filter(isImageBlock)
        .map((block) => block.data.file.url);

      const imagesToDelete: string[] = initialPostImages
        .filter((url) => !imageData.includes(url))
        .map((url) => url.split("/")[4]); // get file name

      if (imagesToDelete.length) {
        const removingStatus = await imageRemove(imagesToDelete);
        if (!removingStatus.success) {
          throw new Error("Cant delete images from this news item");
        }
      }
    }

    const updatedNews = await updateNewsByParams({
      where: { id: parseInt(params.postId) },
      data,
    });
    if (!updatedNews) {
      throw new Error(`Failed to update the news with id: ${params.postId}`);
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  }
}
