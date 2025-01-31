import Link from "next/link";

import { SITE_CONFIG } from "@/shared/constants";
import { Icons } from "@/shared/ui";

import { Buttons } from "../buttons";

export function PrimaryNavbar() {
  return (
    <>
      <Link href="/" className="hidden items-center space-x-2 xl:flex">
        <Icons.graduationCap />
        <span className="font-heading text-xl font-bold">
          {SITE_CONFIG.name}
        </span>
      </Link>

      <div className="hidden w-full items-center md:ml-4 lg:ml-8 xl:flex">
        <Buttons />
      </div>
    </>
  );
}
