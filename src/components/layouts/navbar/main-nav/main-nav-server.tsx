import { getHeaderButtonsByParams } from "@/lib/actions/header-buttons";
import ErrorBoundary from "@/components/error-boundary";
import MainNav from "@/components/layouts/navbar/main-nav/main-nav";
import { NavError } from "@/components/layouts/navbar/nav-error";

interface MainNavWithSuspenseProps {
  headerButtonsPromise: ReturnType<typeof getHeaderButtonsByParams>;
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
