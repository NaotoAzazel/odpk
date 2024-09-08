import { db } from "@/lib/db";
import DashboardShell from "@/components/dashboard-shell";
import { Header } from "@/components/header";

import { ButtonItem } from "./_components/button-item";
import { ButtonsCreateButton } from "./_components/buttons-create-dialog";

export default async function HeaderButtonsPage() {
  // TODO: add getButtonsByParams
  const buttons = await db.headerButtons.findMany();

  return (
    <DashboardShell>
      <Header heading="Кнопки заголовка">
        <ButtonsCreateButton />
      </Header>
      {/* TODO: make it so that when adding a button, only this 
          button is re-rendered, not the whole page 
      */}
      <div className="divide-y divide-border rounded-md border">
        {buttons.map((button, i) => (
          <ButtonItem button={button} key={i} />
        ))}
      </div>
    </DashboardShell>
  );
}
