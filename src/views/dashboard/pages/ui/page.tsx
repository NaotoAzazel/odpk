"use client";

import { DashboardShell, Title } from "@/shared/ui";

import { PagesTable } from "./table";

export function DashboardPagesPage() {
  return (
    <DashboardShell>
      <Title heading="Сторінки" />
      <PagesTable />
    </DashboardShell>
  );
}
