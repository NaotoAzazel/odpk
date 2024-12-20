import { Suspense } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { siteConfig } from "@/config/site";
import { getHeaderButtons } from "@/lib/actions/header-buttons";
import { authOptions } from "@/lib/auth";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import { AuthDropdown } from "@/components/layouts/navbar/auth-dropdown";
import { MainNavServer } from "@/components/layouts/navbar/main-nav/main-nav-server";
import { MainNavSkeleton } from "@/components/layouts/navbar/main-nav/main-nav-skeleton";
import MobileNav from "@/components/layouts/navbar/mobile-nav";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default async function Navbar() {
  const user = await getServerSession(authOptions);
  const headerButtonsPromise = getHeaderButtons();

  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16">
      <header className="relative border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center">
            <Link href="/" className="hidden items-center space-x-2 xl:flex">
              <Icons.graduationCap />
              <span className="font-heading text-xl font-bold">
                {siteConfig.name}
              </span>
            </Link>
            <div className="hidden w-full xl:flex">
              <Suspense fallback={<MainNavSkeleton />}>
                <MainNavServer headerButtonsPromise={headerButtonsPromise} />
              </Suspense>
            </div>
            <MobileNav />

            <div className="ml-4 flex w-full gap-4 lg:items-center lg:justify-end">
              <div className="w-full flex-1 xl:w-auto xl:flex-none">
                <CommandMenu />
              </div>

              <nav className="flex items-center">
                {user?.user && <AuthDropdown user={user} />}
              </nav>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
