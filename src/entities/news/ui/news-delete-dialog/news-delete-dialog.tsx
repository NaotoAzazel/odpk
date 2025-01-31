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

import { useDeleteNews } from "../../lib";

interface NewsDeleteDialogProps {
  id: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function NewsDeleteDialog({
  id,
  isOpen,
  onOpenChange,
}: NewsDeleteDialogProps) {
  const { deleteNews, isPending } = useDeleteNews(id);

  async function handleDelete() {
    try {
      const message = await deleteNews();
      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    } finally {
      onOpenChange(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading font-bold">
            Ви впевнені що хочете видалити цю новину?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Цю дію не можна буде скасувати.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={handleDelete}
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
