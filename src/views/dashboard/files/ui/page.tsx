import { Suspense } from "react";

import { DataTableSkeleton } from "@/widgets/data-table";
import { getFiles } from "@/entities/file";
import {
  DashboardShell,
  ErrorBoundary,
  ErrorContainer,
  Title,
} from "@/shared/ui";

import { FilesTable } from "./table";

export async function DashboardFilesPage() {
  const filesPromise = getFiles();

  return (
    <DashboardShell className="px-1">
      <Title heading="Файли" />
      <ErrorBoundary
        fallback={
          <ErrorContainer
            title="Виникла помилка з отриманням файлів"
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
          <FilesTable filesPromise={filesPromise} />
        </Suspense>
      </ErrorBoundary>
    </DashboardShell>
  );
}
