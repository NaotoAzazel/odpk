"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { isValidUser } from "@/lib/utils";

interface CheckSessionProps {
  children: React.ReactNode;
}

export function CheckSession({ children }: CheckSessionProps) {
  const { data, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (status !== "authenticated") return;

    const checkSession = async () => {
      const isValidSession = isValidUser(data?.user);
      if (!isValidSession && status === "authenticated") {
        await signOut({
          redirect: true,
          callbackUrl: "/login?account-deleted=true",
        });
      }
    };

    checkSession();
  }, [pathname, data, status]);

  return <>{children}</>;
}
