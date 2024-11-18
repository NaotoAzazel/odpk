import { Skeleton } from "@/components/ui/skeleton";
import DashboardShell from "@/components/dashboard-shell";
import { Header } from "@/components/header";

import { ButtonItemSkeleton } from "../../_components/button-item-skeleton";

export default function LoadingEditPage() {
  return (
    <DashboardShell>
      <Header heading="Редагування кнопки" />
      <div className="space-y-4">
        <div className="flex w-full flex-col space-y-1">
          <p className="text-muted-foreground">Головна кнопка</p>
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground">Елементи кнопки</p>
          <div className="divide-y divide-border rounded-md border">
            <ButtonItemSkeleton />
            <ButtonItemSkeleton />
            <ButtonItemSkeleton />
            <ButtonItemSkeleton />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
