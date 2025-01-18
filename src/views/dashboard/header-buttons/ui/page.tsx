import { Suspense } from "react";

import {
  ButtonCreateDialog,
  ButtonItemSkeleton,
  ButtonsHolder,
  getHeaderButtons,
} from "@/entities/header-button";
import {
  DashboardShell,
  ErrorBoundary,
  ErrorContainer,
  Title,
} from "@/shared/ui";

export async function HeaderButtonsPage() {
  const buttonsPromise = getHeaderButtons();

  return (
    <DashboardShell>
      <Title heading="Кнопки заголовка">
        <ButtonCreateDialog />
      </Title>
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
