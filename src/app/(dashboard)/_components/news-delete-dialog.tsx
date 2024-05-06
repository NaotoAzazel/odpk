"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";

async function deletePost(newsId: number) {
  const response = await fetch(`/api/news/${newsId}`, {
    method: "DELETE"
  });

  if(!response?.ok) {
    throw new Error("Виникла помилка під час спроби видалити новину");
  }
}

interface DeleteNewsDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNewsId: number;
};

export function DeleteNewsDialog({ isOpen, setIsOpen, selectedNewsId }: DeleteNewsDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const submit = async() => {
    try {
      setIsLoading(true);
  
      await deletePost(selectedNewsId);

      toast({
        title: "Новину видалено"
      });
  
      setIsLoading(false);
      setIsOpen(false);

      router.refresh();
    } catch(error) {
      if(error instanceof Error) {
        toast({
          title: "Щось пiшло не так",
          description: error.message,
          variant: "destructive"
        });
      }

      setIsLoading(false);
      setIsOpen(false);
    }
  }
  
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
            className="bg-red-600 focus:ring-red-600 hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Видалити</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}