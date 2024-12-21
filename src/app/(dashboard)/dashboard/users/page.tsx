import { Suspense } from "react";
import { Metadata } from "next";

import { getUsers } from "@/lib/actions/users";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import ErrorBoundary from "@/components/error-boundary";
import { ErrorContainer } from "@/components/error-container";
import { Header } from "@/components/header";

import DashboardShell from "../_components/dashboard-shell";
import { UsersTable } from "./_components/table/users-table";

export const metadata: Metadata = {
  title: "Користувачі",
  description: "Керуйте користувачами",
};

export default async function DashboardUsersPage() {
  const usersPromise = getUsers();

  return (
    <DashboardShell className="px-1">
      <Header heading="Користувачі" />
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
