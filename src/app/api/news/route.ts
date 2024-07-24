import { z } from "zod"; 

import { db } from "@/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const newsCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const isAuth = await getServerSession(authOptions); 
    if(!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const json = await req.json();
    const body = newsCreateSchema.parse(json);

    const post = await db.post.create({
      data: {
        title: body.title,
        published: false
      },
      select: {
        id: true
      }
    });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch(error) {
    if(error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
} 