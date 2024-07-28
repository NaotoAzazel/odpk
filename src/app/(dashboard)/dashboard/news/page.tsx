import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

import { DashboardHeader } from "./_components/dashboard-header";
import DashboardShell from "./_components/dashboard-shell";
import { NewsTable } from "./_components/news-table";

import { getNews } from "@/lib/actions/news";

import ErrorBoundary from "@/components/error-boundary";
import { NewsCardsErrorContainer } from "@/components/news-cards-error-container";
import { Suspense } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новини",
  description: "Керуйте новинами",
};

export default async function DashboardNewsPage() {
  const newsPromise = getNews();

  return (
    <DashboardShell className="px-1">
      <DashboardHeader heading="Доступнi новини" />
      <ErrorBoundary fallback={<NewsCardsErrorContainer />}>
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
