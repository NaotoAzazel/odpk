import { authOptions, validateSession } from "@/features/auth";
import { getPages, pageCreateSchema } from "@/entities/page";
import { db, handleApiError, successResponse } from "@/shared/lib";

export async function POST(req: Request) {
  try {
    await validateSession(authOptions);

    const json = await req.json();
    const body = pageCreateSchema.parse(json);

    const post = await db.staticPages.create({
      data: {
        title: body.title,
        content: body.content,
        href: body.href,
      },
      select: {
        id: true,
      },
    });

    return successResponse(200, {
      message: "PAGE_CREATED_SUCCESSFULLY",
      data: post,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    const pages = await getPages();
    return successResponse(200, { message: "SUCCESS", data: pages });
  } catch (error) {
    return handleApiError(error);
  }
}
