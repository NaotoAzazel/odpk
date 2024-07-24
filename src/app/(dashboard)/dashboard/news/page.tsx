import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

import DashboardShell from "./_components/dashboard-shell";
import { DashboardHeader } from "./_components/dashboard-header";
import { NewsTable } from "./_components/news-table";

import { getNews } from "@/lib/actions/news";

import { Suspense } from "react";

export default async function DashboardNewsPage() {
  const newsPromise = getNews();

  return (
    <DashboardShell className="px-1">
      <DashboardHeader heading="Доступнi новини" />
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
    </DashboardShell>
  );
}
