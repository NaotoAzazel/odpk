import { Suspense } from "react";

import { DataTableSkeleton } from "@/widgets/data-table";
import { getPages } from "@/entities/page";
import {
  DashboardShell,
  ErrorBoundary,
  ErrorContainer,
  Title,
} from "@/shared/ui";

import { PagesTable } from "./table";

export function DashboardPagesPage() {
  const pages = getPages();

  return (
    <DashboardShell>
      <Title heading="Сторінки" />
      <ErrorBoundary
        fallback={
          <ErrorContainer
            title="Виникла помилка з отриманням сторінок"
            description="Ми вже працює над виправленням цієї помилки"
          />
        }
      >
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={1}
              cellWidths={["4rem", "20rem", "10rem", "10rem", "5rem"]}
              shrinkZero
            />
          }
        >
          <PagesTable pagesPromise={pages} />
        </Suspense>
      </ErrorBoundary>
    </DashboardShell>
  );
}
