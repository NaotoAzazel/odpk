"use client";

import {
  dashboardSearchParamsSchema,
  DashboardSearchParamsSchema,
} from "@/shared/model";
import { DashboardShell, Title } from "@/shared/ui";

import { PagesTable } from "./table";

interface DashboardPagesPageProps {
  params: DashboardSearchParamsSchema;
}

export function DashboardPagesPage({ params }: DashboardPagesPageProps) {
  const parsedParams = dashboardSearchParamsSchema.parse(params);

  return (
    <DashboardShell>
      <Title heading="Сторінки" />
      <PagesTable page={parsedParams.page} />
    </DashboardShell>
  );
}
