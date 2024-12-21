import { Suspense } from "react";
import { Metadata } from "next";

import { getPages } from "@/lib/actions/pages";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import ErrorBoundary from "@/components/error-boundary";
import { ErrorContainer } from "@/components/error-container";
import { Header } from "@/components/header";

import DashboardShell from "../_components/dashboard-shell";
import { PagesTable } from "./_components/table/pages-table";

export const metadata: Metadata = {
  title: "Сторінки",
  description: "Керуйте сторінками",
};

export default function Page() {
  const pages = getPages();

  return (
    <DashboardShell>
      <Header heading="Сторінки" />
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
