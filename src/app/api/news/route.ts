import { authOptions, validateSession } from "@/features/auth";
import { newsItemCreateSchema } from "@/entities/news";
import { db, handleApiError, successResponse } from "@/shared/lib";

export async function POST(req: Request) {
  try {
    await validateSession(authOptions);

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
