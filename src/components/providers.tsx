"use client";

import { SessionProvider } from "next-auth/react";

import { CheckSession } from "./check-session";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <CheckSession>{children}</CheckSession>
    </SessionProvider>
  );
}
