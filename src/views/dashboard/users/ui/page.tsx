import { DashboardShell, Title } from "@/shared/ui";

import { UsersTable } from "./table";

export function DashboardUsersPage() {
  return (
    <DashboardShell className="px-1">
      <Title heading="Користувачі" />
      <UsersTable />
    </DashboardShell>
  );
}
