import {
  dashboardSearchParamsSchema,
  DashboardSearchParamsSchema,
} from "@/shared/model";
import { DashboardShell, Title } from "@/shared/ui";

import { UsersTable } from "./table";

interface DashboardUsersPageProps {
  params: DashboardSearchParamsSchema;
}

export function DashboardUsersPage({ params }: DashboardUsersPageProps) {
  const parsedParams = dashboardSearchParamsSchema.parse(params);

  return (
    <DashboardShell className="px-1">
      <Title heading="Користувачі" />
      <UsersTable page={parsedParams.page} />
    </DashboardShell>
  );
}
