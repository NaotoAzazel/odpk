import { DashboardShell, Title } from "@/shared/ui";

import { HeaderButtonsTable } from "./table";

export async function HeaderButtonsPage() {
  return (
    <DashboardShell>
      <Title heading="Кнопки заголовка" />
      <HeaderButtonsTable />
    </DashboardShell>
  );
}
