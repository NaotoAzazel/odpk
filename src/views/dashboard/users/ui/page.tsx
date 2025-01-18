import { Suspense } from "react";

import { DataTableSkeleton } from "@/widgets/data-table";
import { getUsers } from "@/entities/user";
import {
  DashboardShell,
  ErrorBoundary,
  ErrorContainer,
  Title,
} from "@/shared/ui";

import { UsersTable } from "./table";

export function DashboardUsersPage() {
  const usersPromise = getUsers();

  return (
    <DashboardShell className="px-1">
      <Title heading="Користувачі" />
      <ErrorBoundary
        fallback={
          <ErrorContainer
            title="Виникла помилка з отриманням сторінок"
            description="Ми вже працює над виправленням цієї помилки"
          />
        }
      >
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={1}
              cellWidths={["4rem", "20rem", "10rem", "10rem", "5rem"]}
              shrinkZero
            />
          }
        >
          <UsersTable usersPromise={usersPromise} />
        </Suspense>
      </ErrorBoundary>
    </DashboardShell>
  );
}
