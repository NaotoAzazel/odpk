import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import DashboardShell from "@/components/dashboard-shell";
import { Header } from "@/components/header";

import { AddButtonItem } from "./_components/add-button-item";
import { ButtonElement } from "./_components/button-element";
import { MainButtonHolder } from "./_components/main-button/main-button-holder";

interface EditButtonPageProps {
  params: {
    buttonId: string;
  };
}

export default async function EditButtonPage({ params }: EditButtonPageProps) {
  const button = await db.headerButtons.findUnique({
    where: { id: Number(params.buttonId) },
  });

  if (!button) {
    return notFound();
  }

  return (
    <DashboardShell>
      <Header heading="Редагування кнопки" />
      <div className="space-y-4">
        <MainButtonHolder buttonData={button} />
        <div className="space-y-2">
          <p className="text-muted-foreground">Елементи кнопки</p>
          <AddButtonItem />
          <div className="divide-y divide-border rounded-md border">
            {button.items.length > 0 ? (
              <>
                {button.items.map((buttonItem, i) => (
                  <ButtonElement
                    title={buttonItem.title}
                    description={buttonItem.description}
                    href={buttonItem.href}
                    key={i}
                  />
                ))}
              </>
            ) : (
              <p>no items</p>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
