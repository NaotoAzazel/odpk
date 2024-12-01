"use client";

import { UserCreateDialog } from "../user-create-dialog";

export function UsersTableToolbarActions() {
  return (
    <div className="flex w-full items-center justify-end overflow-auto">
      <UserCreateDialog />
    </div>
  );
}
