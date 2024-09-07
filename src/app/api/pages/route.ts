import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pageCreateSchema } from "@/lib/validation/page";

export async function POST(req: Request) {
  try {
    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

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

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
