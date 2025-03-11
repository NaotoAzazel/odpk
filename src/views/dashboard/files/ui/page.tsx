import {
  DashboardSearchParamsSchema,
  dashboardSearchParamsSchema,
} from "@/shared/model";
import { DashboardShell, Title } from "@/shared/ui";

import { FilesTable } from "./table";

interface DashboardFilesPageProps {
  params: DashboardSearchParamsSchema;
}

export function DashboardFilesPage({ params }: DashboardFilesPageProps) {
  const parsedParams = dashboardSearchParamsSchema.parse(params);

  return (
    <DashboardShell className="px-1">
      <Title heading="Файли" />
      <FilesTable page={parsedParams.page} />
    </DashboardShell>
  );
}
