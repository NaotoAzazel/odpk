import { z } from "zod";

import { authOptions, validateSession } from "@/features/auth";
import {
  deletePageById,
  getPageByHref,
  getPageById,
  getPageByTitle,
  PageUpdateValidator,
  updatePageById,
} from "@/entities/page";
import { ApiError } from "@/shared/exceptions";
import { handleApiError, successResponse } from "@/shared/lib";

const routeContextSchema = z.object({
  params: z.object({
    pageId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    await validateSession(authOptions);

    const { params } = routeContextSchema.parse(context);

    const isPageExists = await getPageById(Number(params.pageId));
    if (!isPageExists) {
      throw new ApiError("PAGES_WITH_THIS_ID_NOT_FOUND", 409);
    }

    await deletePageById(Number(params.pageId));

    return successResponse(200, { message: "PAGE_DELETED_SUCCESSFULLY" });
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
    const data = PageUpdateValidator.parse(json);

    const pageId = Number(params.pageId);

    if (!data.href) {
      throw new ApiError("EMPTY_HREF", 400);
    }

    if (!data.title) {
      throw new ApiError("EMPTY_TITLE", 400);
    }

    const pageWithSameHref = await getPageByHref(data.href);
    if (pageWithSameHref && pageWithSameHref.id !== pageId) {
      throw new ApiError("PAGE_WITH_THIS_HREF_EXISTS", 409);
    }

    const pageWithSameTitle = await getPageByTitle(data.title);
    if (pageWithSameTitle && pageWithSameTitle.id !== pageId) {
      throw new ApiError("PAGE_WITH_THIS_TITLE_EXISTS", 409);
    }

    const isPageExists = await getPageById(pageId);
    if (!isPageExists) {
      throw new ApiError("PAGES_WITH_THIS_ID_NOT_FOUND", 409);
    }

    await updatePageById(pageId, data);

    return successResponse(200, { message: "PAGE_UPDATED_SUCCESSFULLY" });
  } catch (error) {
    return handleApiError(error);
  }
}
