"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Icons,
} from "@/shared/ui";

export function HrefInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-3">
          <Icons.info className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Інформація про посилання на сторінку</DialogTitle>
        <div>
          Це поле може бути таким: &quot;documents/teacher&quot;,
          &quot;teacher&quot;, &quot;super/long/path&quot;. Не ставте
          &quot;/&quot; на початку посилання та в кінці
        </div>
      </DialogContent>
    </Dialog>
  );
}
