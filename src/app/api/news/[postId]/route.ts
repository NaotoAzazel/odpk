import { z } from "zod";

import { authOptions, validateSession } from "@/features/auth";
import {
  deleteNewsItemById,
  getNewsItemById,
  newsItemUpdateSchema,
  updateNewsById,
} from "@/entities/news";
import { ApiError } from "@/shared/exceptions";
import { handleApiError, successResponse } from "@/shared/lib";

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
    await validateSession(authOptions);

    const { params } = routeContextSchema.parse(context);

    const isNewsItemExists = await getNewsItemById(Number(params.postId));
    if (!isNewsItemExists) {
      throw new ApiError("NEWS_WITH_THIS_ID_NOT_FOUND", 409);
    }

    await deleteNewsItemById(Number(params.postId));

    return successResponse(200, { message: "NEWS_ITEM_DELETED_SUCCESSFULLY" });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    await validateSession(authOptions);

    const { params } = routeContextSchema.parse(context);

    const json = await req.json();
    const data = newsItemUpdateSchema.parse(json);

    const isNewsItemExists = await getNewsItemById(Number(params.postId));
    if (!isNewsItemExists) {
      throw new ApiError("NEWS_WITH_THIS_ID_NOT_FOUND", 409);
    }

    await updateNewsById(Number(params.postId), data);

    return successResponse(200, { message: "NEWS_ITEM_UPDATED_SUCCESSFULLY" });
  } catch (error) {
    return handleApiError(error);
  }
}
