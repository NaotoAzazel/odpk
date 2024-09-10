import { getServerSession } from "next-auth";
import { z } from "zod";

import { getHeaderButtonsByParams } from "@/lib/actions/header-buttons";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { HeaderButtonValidator } from "@/lib/validation/header-buttons";

export async function POST(req: Request) {
  try {
    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const json = await req.json();
    const body = HeaderButtonValidator.parse(json);

    await db.headerButtons.create({
      data: {
        title: body.title,
        href: body.href || "",
        items: [],
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function GET() {
  try {
    const buttons = await getHeaderButtonsByParams();
    return new Response(JSON.stringify(buttons), { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
