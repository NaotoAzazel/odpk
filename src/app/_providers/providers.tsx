"use client";

import { SessionProvider } from "next-auth/react";

import { CheckSession } from "./check-session";
import { TanstackProvider } from "./tanstack-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <TanstackProvider>
        <CheckSession>{children}</CheckSession>
      </TanstackProvider>
    </SessionProvider>
  );
}
