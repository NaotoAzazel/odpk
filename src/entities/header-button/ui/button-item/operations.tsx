"use client";

import { useState } from "react";
import { HeaderButtons } from "@prisma/client";

import { REDIRECTS } from "@/shared/constants";
import { ActionMenu, DeleteDialog, DisplayMode } from "@/shared/ui";

const WHEN_CHANGE_DISPLAY_MODE: DisplayMode = "";

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

      <ActionMenu
        buttons={[
          {
            type: "edit",
            href: `${REDIRECTS.toHeaderButtonEdit}/${data.id}`,
            whenChangeDisplayMode: WHEN_CHANGE_DISPLAY_MODE,
          },
          {
            type: "delete",
            onClick: () => setIsShowDeleteDialog(true),
            whenChangeDisplayMode: WHEN_CHANGE_DISPLAY_MODE,
          },
        ]}
        className="flex"
      />
    </>
  );
}
