import { getServerSession } from "next-auth";
import { z } from "zod";

import { deleteNewsItemById, updateNewsByParams } from "@/lib/actions/news";
import { authOptions } from "@/lib/auth";
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
