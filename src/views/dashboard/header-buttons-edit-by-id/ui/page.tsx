import { notFound } from "next/navigation";

import {
  AddButtonItem,
  ButtonElement,
  getHeaderButtonById,
  MainButtonHolder,
} from "@/entities/header-button";
import { DashboardShell, NoItemsPlaceholder, Title } from "@/shared/ui";

interface DashboardEditButtonByIdPageProps {
  params: {
    buttonId: string;
  };
}

export async function DashboardEditButtonByIdPage({
  params,
}: DashboardEditButtonByIdPageProps) {
  const button = await getHeaderButtonById(Number(params.buttonId));

  if (!button) {
    return notFound();
  }

  return (
    <DashboardShell>
      <Title heading="Редагування кнопки" />
      <div className="space-y-4">
        <MainButtonHolder buttonData={button} />
        <div className="space-y-2">
          <p className="text-muted-foreground">Елементи кнопки</p>
          <AddButtonItem button={button} />
          <div className="divide-y divide-border rounded-md border">
            {button.items.length > 0 ? (
              <>
                {button.items.map((buttonItem, i) => (
                  <ButtonElement
                    rootButton={button}
                    buttonElement={buttonItem}
                    key={i}
                  />
                ))}
              </>
            ) : (
              <NoItemsPlaceholder
                title="Не вдалося знайти елементи кнопки"
                description="Найімовірніше елементів не існує"
              />
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
