import { getHeaderButtons } from "@/entities/header-button";
import { ErrorBoundary } from "@/shared/ui";

import { MainNav, NavError } from "./";

interface MainNavWithSuspenseProps {
  headerButtonsPromise: ReturnType<typeof getHeaderButtons>;
}

export async function MainNavServer({
  headerButtonsPromise,
}: MainNavWithSuspenseProps) {
  const headerButtons = await headerButtonsPromise;

  return (
    <ErrorBoundary fallback={<NavError />}>
      <MainNav items={headerButtons} />
    </ErrorBoundary>
  );
}
