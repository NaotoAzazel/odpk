"use client";

import { useState } from "react";
import { DisplayMode } from "@/types";
import { HeaderButtons } from "@prisma/client";

import { redirects } from "@/config/constants";

import { ActionMenu } from "../../_components/action-cell/action-menu";
import { DeleteDialog } from "../../_components/delete-dialog";

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
            href: `${redirects.toHeaderButtonEdit}/${data.id}`,
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
