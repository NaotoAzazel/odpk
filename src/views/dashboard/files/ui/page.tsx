import { DashboardShell, Title } from "@/shared/ui";

import { FilesTable } from "./table";

export function DashboardFilesPage() {
  return (
    <DashboardShell className="px-1">
      <Title heading="Файли" />
      <FilesTable />
    </DashboardShell>
  );
}
