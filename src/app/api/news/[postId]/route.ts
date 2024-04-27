import { z } from "zod"; 
import { PostValidator } from "@/lib/validation/post";

import { db } from "@/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string()
  })
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const json = await req.json();
    const body = PostValidator.parse(json);

    const isAuth = await getServerSession(authOptions); 
    if(!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    await db.post.update({
      where: {
        id: parseInt(params.postId)
      },
      data: {
        title: body.title,
        content: body.content,
        images: body.images
      }
    });

    return new Response(null, { status: 200 });
  } catch(error) {
    if(error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}