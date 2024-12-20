import { getServerSession } from "next-auth";
import { z } from "zod";

import {
  deletePageById,
  getPageByHref,
  getPageByTitle,
  updatePageById,
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

    // TODO: first check if a page with that id exists, then delete it
    await deletePageById(Number(params.pageId));

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

    if (!data.href) {
      return new Response(JSON.stringify({ message: "EMPTY_HREF" }), {
        status: 400,
      });
    }

    if (!data.title) {
      return new Response(JSON.stringify({ message: "EMPTY_TITLE" }), {
        status: 400,
      });
    }

    const pageWithSameHref = await getPageByHref(data.href);
    if (pageWithSameHref && pageWithSameHref.id !== pageId) {
      throw new Error("Сторінка з таким посиланням вже існує");
    }

    const pageWithSameTitle = await getPageByTitle(data.title);
    if (pageWithSameTitle && pageWithSameTitle.id !== pageId) {
      throw new Error("Сторінка з такою назвою вже існує");
    }

    await updatePageById(pageId, data);

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
