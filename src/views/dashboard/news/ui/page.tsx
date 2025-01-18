import { Suspense } from "react";

import { DataTableSkeleton } from "@/widgets/data-table";
import { getNews } from "@/entities/news";
import {
  DashboardShell,
  ErrorBoundary,
  ErrorContainer,
  Title,
} from "@/shared/ui";

import { NewsTable } from "./table";

export async function DashboardNewsPage() {
  const newsPromise = getNews();

  return (
    <DashboardShell className="px-1">
      <Title heading="Доступнi новини" />
      <ErrorBoundary
        fallback={
          <ErrorContainer
            title="Виникла помилка з отримання новин"
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
          <NewsTable newsPromise={newsPromise} />
        </Suspense>
      </ErrorBoundary>
    </DashboardShell>
  );
}
