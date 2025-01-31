import { DashboardShell, Title } from "@/shared/ui";

import { NewsTable } from "./table";

export function DashboardNewsPage() {
  return (
    <DashboardShell className="px-1">
      <Title heading="Доступнi новини" />
      <NewsTable />
    </DashboardShell>
  );
}
