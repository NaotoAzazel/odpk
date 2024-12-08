import { Suspense } from "react";
import { Metadata } from "next";

import { getFiles } from "@/lib/files/actions";
import DashboardShell from "@/components/dashboard-shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import ErrorBoundary from "@/components/error-boundary";
import { ErrorContainer } from "@/components/error-container";
import { Header } from "@/components/header";

import { FilesTable } from "./_components/table/files-table";

export const metadata: Metadata = {
  title: "Файли",
  description: "Керуйте користувачами",
};

export default async function DashboardFilesPage() {
  const filesPromise = getFiles();

  return (
    <DashboardShell className="px-1">
      <Header heading="Файли" />
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
