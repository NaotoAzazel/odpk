"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { ApiErrorResponse } from "@/shared/exceptions";
import { showError, showSuccess } from "@/shared/lib";
import {
  ApiErrorResponseWithDetails,
  ApiSuccessResponse,
} from "@/shared/model";
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

async function deleteRequest(endpoint: string) {
  const response = await axios
    .delete<ApiSuccessResponse>(endpoint)
    .catch((error) => {
      const errorResponse: ApiErrorResponseWithDetails = error.response.data;
      throw new ApiErrorResponse(errorResponse.message, errorResponse.errors);
    });

  return response.data;
}

interface DeleteDialogProps {
  title?: string;
  description?: string;
  endpoint: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DeleteDialog({
  title,
  description,
  endpoint,
  isOpen,
  onOpenChange,
}: DeleteDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const { message } = await deleteRequest(endpoint);

      router.refresh();
      showSuccess(API_SUCCESS[message]);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && title.length && (
            <AlertDialogTitle className="font-heading font-bold">
              {title}
            </AlertDialogTitle>
          )}
          {description && description.length && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
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
