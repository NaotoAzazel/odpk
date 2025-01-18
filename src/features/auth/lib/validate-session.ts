import { getServerSession, NextAuthOptions, Session } from "next-auth";

import { isValidUser } from "@/entities/user";
import { ApiError } from "@/shared/exceptions";

export async function validateSession(
  authOptions: NextAuthOptions,
): Promise<Session["user"]> {
  const session = await getServerSession(authOptions);
  const isValidSession = isValidUser(session?.user);

  if (!isValidSession) {
    throw new ApiError("NOT_AUTHORIZED", 403);
  }

  return session!.user as Session["user"];
}
