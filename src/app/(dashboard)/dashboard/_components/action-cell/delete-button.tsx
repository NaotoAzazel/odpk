import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface DeleteButtonProps {
  onClick: () => void;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <Button
      variant="outline"
      className="h-8 w-8 bg-red-600 p-0 text-white hover:bg-red-700 hover:text-muted focus:ring-red-600"
      onClick={onClick}
    >
      <Icons.trash className="h-4 w-4" />
    </Button>
  );
}
