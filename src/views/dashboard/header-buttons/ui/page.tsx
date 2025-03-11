import {
  dashboardSearchParamsSchema,
  DashboardSearchParamsSchema,
} from "@/shared/model";
import { DashboardShell, Title } from "@/shared/ui";

import { HeaderButtonsTable } from "./table";

interface HeaderButtonsPageProps {
  params: DashboardSearchParamsSchema;
}

export async function HeaderButtonsPage({ params }: HeaderButtonsPageProps) {
  const parsedParams = dashboardSearchParamsSchema.parse(params);

  return (
    <DashboardShell>
      <Title heading="Кнопки заголовка" />
      <HeaderButtonsTable page={parsedParams.page} />
    </DashboardShell>
  );
}
