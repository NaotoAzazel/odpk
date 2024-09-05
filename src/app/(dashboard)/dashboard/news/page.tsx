import { Suspense } from "react";
import { Metadata } from "next";

import { getNews } from "@/lib/actions/news";
import DashboardShell from "@/components/dashboard-shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import ErrorBoundary from "@/components/error-boundary";
import { Header } from "@/components/header";
import { NewsCardsErrorContainer } from "@/components/news-cards-error-container";

import { NewsTable } from "./_components/news-table";

export const metadata: Metadata = {
  title: "Новини",
  description: "Керуйте новинами",
};

export default async function DashboardNewsPage() {
  const newsPromise = getNews();

  return (
    <DashboardShell className="px-1">
      <Header heading="Доступнi новини" />
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
