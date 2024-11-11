import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { SessionCheckClient } from "./session-check-client";

export async function SessionCheckServer() {
  const user = await getServerSession(authOptions);
  const authCookies = cookies().get("next-auth.session-token");

  if (!user && !authCookies) {
    return null;
  }

  return <SessionCheckClient authSessionCookie={authCookies} user={user} />;
}
