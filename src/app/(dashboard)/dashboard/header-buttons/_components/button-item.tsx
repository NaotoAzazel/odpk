import Link from "next/link";
import { HeaderButtons } from "@prisma/client";

import { Operations } from "./operations";

interface ButtonItem {
  button: HeaderButtons;
}

export function ButtonItem({ button }: ButtonItem) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          className="font-heading font-semibold hover:underline"
          href={`/dashboard/header-buttons/edit/${button.id}`}
        >
          {button.title}
        </Link>
      </div>
      <Operations data={button} />
    </div>
  );
}
