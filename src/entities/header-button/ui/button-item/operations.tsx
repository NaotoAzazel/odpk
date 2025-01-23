"use client";

import { useState } from "react";
import { HeaderButtons } from "@prisma/client";

import { REDIRECTS } from "@/shared/constants";
import {
  ActionsDropdownMenu,
  DeleteButton,
  DeleteDialog,
  NavigateToPageButton,
} from "@/shared/ui";

interface OperationsProps {
  data: HeaderButtons;
}

export function Operations({ data }: OperationsProps) {
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState<boolean>(false);

  return (
    <>
      <DeleteDialog
        title="Ви впевнені що хочете видалити цю кнопку?"
        description="Цю дію не можна буде скасувати."
        endpoint={`/api/buttons/${data.id}`}
        isOpen={isShowDeleteDialog}
        onOpenChange={(isOpen) => setIsShowDeleteDialog(isOpen)}
      />

      <ActionsDropdownMenu
        actionSlot={
          <>
            <NavigateToPageButton
              href={`${REDIRECTS.toHeaderButtonEdit}/${data.id}`}
              text="Відкрити"
              icon="openLink"
            />
            <DeleteButton
              text="Видалити"
              onClick={() => setIsShowDeleteDialog(true)}
            />
          </>
        }
      />
    </>
  );
}
