import { handleApiError, successResponse, validateUser } from "@/lib/api/lib";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { newsItemCreateSchema } from "@/lib/validation/post";

export async function POST(req: Request) {
  try {
    await validateUser(authOptions);

    const json = await req.json();
    const body = newsItemCreateSchema.parse(json);

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
      select: {
        id: true,
      },
    });

    return successResponse(200, {
      message: "NEWS_ITEM_CREATED_SUCCESSFULLY",
      data: post,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
