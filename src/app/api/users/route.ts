import { getServerSession } from "next-auth";
import { z } from "zod";

import { createUser, getUserByEmail } from "@/lib/actions/users";
import { authOptions } from "@/lib/auth";
import { hashPassword } from "@/lib/bcrypt";
import { userAuthSchema } from "@/lib/validation/auth";

export async function POST(req: Request) {
  try {
    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const json = await req.json();
    const body = userAuthSchema.parse(json);

    const existingUserByEmail = await getUserByEmail(body.email);
    if (existingUserByEmail) {
      return new Response("User with this email already exists", {
        status: 409,
      });
    }

    const hashedPassword = hashPassword(body.password);
    await createUser({ email: body.email, hashedPassword });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response(null, { status: 500 });
  }
}
