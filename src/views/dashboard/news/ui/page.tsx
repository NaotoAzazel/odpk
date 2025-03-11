import {
  dashboardSearchParamsSchema,
  DashboardSearchParamsSchema,
} from "@/shared/model";
import { DashboardShell, Title } from "@/shared/ui";

import { NewsTable } from "./table";

interface DashboardNewsPageProps {
  params: DashboardSearchParamsSchema;
}

export function DashboardNewsPage({ params }: DashboardNewsPageProps) {
  const parsedParams = dashboardSearchParamsSchema.parse(params);

  return (
    <DashboardShell className="px-1">
      <Title heading="Доступнi новини" />
      <NewsTable page={parsedParams.page} />
    </DashboardShell>
  );
}
