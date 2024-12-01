import { getServerSession } from "next-auth";
import { z } from "zod";

import { deleteUserById } from "@/lib/actions/users";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from 'next/cache'

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    if (session.user.id === params.userId) {
      return Response.json(
        { message: "You cant delete your account" },
        { status: 409 },
      );
    }

    await deleteUserById({ userId: params.userId });
    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
