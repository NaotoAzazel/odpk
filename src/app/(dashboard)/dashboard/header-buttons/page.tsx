import { Suspense } from "react";

import { getHeaderButtons } from "@/lib/actions/header-buttons";
import DashboardShell from "@/components/dashboard-shell";
import ErrorBoundary from "@/components/error-boundary";
import { ErrorContainer } from "@/components/error-container";
import { Header } from "@/components/header";

import { ButtonItemSkeleton } from "./_components/button-item-skeleton";
import { ButtonsCreateButton } from "./_components/buttons-create-dialog";
import { ButtonsHolder } from "./_components/buttons-holder";

export default async function HeaderButtonsPage() {
  const buttonsPromise = getHeaderButtons();

  return (
    <DashboardShell>
      <Header heading="Кнопки заголовка">
        <ButtonsCreateButton />
      </Header>
      <ErrorBoundary
        fallback={
          <ErrorContainer
            title="Виникла помилка з отриманням кнопок"
            description="Ми вже працює над виправленням цієї помилки"
          />
        }
      >
        <Suspense
          fallback={
            <>
              <div className="divide-border-200 divide-y rounded-md border">
                <ButtonItemSkeleton />
                <ButtonItemSkeleton />
                <ButtonItemSkeleton />
                <ButtonItemSkeleton />
              </div>
            </>
          }
        >
          <ButtonsHolder buttonPromise={buttonsPromise} />
        </Suspense>
      </ErrorBoundary>
    </DashboardShell>
  );
}
