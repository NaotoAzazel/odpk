import { getPages } from "@/lib/actions/pages";
import { handleApiError, successResponse, validateUser } from "@/lib/api/lib";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pageCreateSchema } from "@/lib/validation/page";

export async function POST(req: Request) {
  try {
    await validateUser(authOptions);

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
