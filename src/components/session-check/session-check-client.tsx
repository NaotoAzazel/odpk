"use client";

import { useEffect } from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface SessionCheckClientProps {
  authSessionCookie: RequestCookie | undefined;
  user: Session | null;
}

export function SessionCheckClient({
  authSessionCookie,
  user,
}: SessionCheckClientProps) {
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      if (!user?.user && authSessionCookie?.value.length) {
        await signOut();
      }
    };

    console.log("Checking...")
    checkSession();
  }, [user, pathname, authSessionCookie]);

  return null;
}
