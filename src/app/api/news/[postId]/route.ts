import { z } from "zod";

import {
  deleteNewsItemById,
  getNewsItemById,
  updateNewsById,
} from "@/lib/actions/news";
import { ApiError } from "@/lib/api/exceptions";
import { handleApiError, successResponse, validateUser } from "@/lib/api/lib";
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
    await validateUser(authOptions);

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
    await validateUser(authOptions);

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
