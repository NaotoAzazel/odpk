import { showError, showSuccess } from "@/shared/lib";
import { API_SUCCESS } from "@/shared/notices";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Icons,
} from "@/shared/ui";

import { useDeletePage } from "../../lib";

interface PageDeleteDiloagProps {
  id: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function PageDeleteDiloag({
  id,
  isOpen,
  onOpenChange,
}: PageDeleteDiloagProps) {
  const { deletePage, isPending } = useDeletePage();

  async function handleDeletePage() {
    try {
      const message = await deletePage(id);
      onOpenChange(false);
      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading font-bold">
            Ви впевнені що хочете видалити цю сторінку?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Цю дію не можна буде скасувати.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={handleDeletePage}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Видалити</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
