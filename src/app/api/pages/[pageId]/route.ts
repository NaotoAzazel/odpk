import { getServerSession } from "next-auth";
import { z } from "zod";

import {
  deletePageByParams,
  getPageByParams,
  updatePageByParams,
} from "@/lib/actions/pages";
import { authOptions } from "@/lib/auth";
import { PageUpdateValidator } from "@/lib/validation/page";

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
    const { params } = routeContextSchema.parse(context);

    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const deletedPage = await deletePageByParams({
      where: { id: Number(params.pageId) },
    });
    if (!deletedPage) {
      throw new Error(
        `Failed to delete page with id: ${Number(params.pageId)}`,
      );
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
    const data = PageUpdateValidator.parse(json);

    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const pageId = Number(params.pageId);

    const pageWithSameHref = await getPageByParams({
      params: {
        where: { href: data.href },
      },
    });

    if (pageWithSameHref && pageWithSameHref.id !== pageId) {
      throw new Error("Сторінка з таким посиланням вже існує");
    }

    const updatedPage = await updatePageByParams({
      params: {
        where: { id: pageId },
        data,
      },
    });
    if (!updatedPage) {
      throw new Error(`Failed to update the page with id: ${pageId}`);
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
