import { Suspense } from "react";
import { Metadata } from "next";

import { getNews } from "@/lib/actions/news";
import DashboardShell from "@/components/dashboard-shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import ErrorBoundary from "@/components/error-boundary";
import { ErrorContainer } from "@/components/error-container";
import { Header } from "@/components/header";

import { NewsTable } from "./_components/table/news-table";

export const metadata: Metadata = {
  title: "Новини",
  description: "Керуйте новинами",
};

export default async function DashboardNewsPage() {
  const newsPromise = getNews();

  return (
    <DashboardShell className="px-1">
      <Header heading="Доступнi новини" />
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
