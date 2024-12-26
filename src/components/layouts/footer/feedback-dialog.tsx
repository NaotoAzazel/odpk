"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ERROR_MESSAGES } from "@/config/messages/error";
import { SUCCESS_MESSAGES } from "@/config/messages/success";
import { showError, showSuccess } from "@/lib/notification";
import { cn } from "@/lib/utils";
import { FeedbackSchema, feedbackSchema } from "@/lib/validation/feedback";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";

export function FeedbackDialog() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackSchema) => {
    setIsLoading(true);

    // TODO: do something with data
    const sendedFeedback = true;

    if (!sendedFeedback) {
      setIsLoading(false);
      showError(ERROR_MESSAGES["YOUR_REVIEW_NOT_SUBMITTED"]);
    }

    setIsLoading(false);
    setIsOpenDialog(false);

    reset();
    showSuccess(SUCCESS_MESSAGES["YOUR_REVIEW_SUBMITTED"]);
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full border bg-transparent">
          Зворотній зв&apos;язок
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[600px]">
        <DialogHeader className="w-full">
          <DialogTitle className="font-heading text-xl tracking-tight text-gray-800 md:text-3xl">
            Шановний відвідувач
          </DialogTitle>
          <DialogDescription className="text-base">
            Якщо ви маєте запитання, пропозицію чи скаргу, будь ласка, заповніть
            коротку форму та викладіть суть звернення в текстовому полі нижче.
            Ми обов&apos;язково з ним ознайомимося і відповімо на вказану вами
            адресу електронної пошти
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="grid gap-1 py-2">
              <Label htmlFor="email" className="text-gray-800">
                Пошта
              </Label>
              <Input
                type="email"
                {...register("email")}
                className={cn({
                  "focus-visible:ring-red-500": errors.email,
                })}
                autoComplete="email"
                placeholder="name@example.ua"
                disabled={isLoading}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-1 py-2">
              <Label htmlFor="fullname" className="text-gray-800">
                Ваше ім&apos;я
              </Label>
              <Input
                type="text"
                {...register("fullname")}
                className={cn({
                  "focus-visible:ring-red-500": errors.fullname,
                })}
                placeholder="ПІБ"
                disabled={isLoading}
              />
              {errors?.fullname && (
                <p className="px-1 text-xs text-red-600">
                  {errors.fullname.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-1 py-2">
            <Label htmlFor="question" className="text-gray-800">
              Ваше запитання
            </Label>
            <Textarea
              {...register("question")}
              className={cn({
                "focus-visible:ring-red-500": errors.question,
              })}
              placeholder="Напишіть, що ви думаєте"
              disabled={isLoading}
            />
            {errors?.question && (
              <p className="px-1 text-xs text-red-600">
                {errors.question.message}
              </p>
            )}
          </div>

          <DialogFooter className="sm:justify-start">
            <Button
              onClick={() => handleSubmit(onSubmit)}
              disabled={isLoading}
              type="submit"
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Відправити</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
