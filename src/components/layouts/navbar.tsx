import MainNav from "@/components/layouts/main-nav";
import MobileNav from "@/components/layouts/mobile-nav";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { CommandMenu } from "@/components/command-menu";
import { AuthDropdown } from "@/components/layouts/auth-dropdown";

import { navConfig } from "@/config/nav";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
  const user = await getServerSession(authOptions);

  return (
    <div className="sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative border-b bg-background">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center">
            <MainNav items={navConfig.mainNav} />
            <MobileNav items={navConfig.mainNav} />

            <div className="ml-4 flex w-full lg:items-center lg:justify-end gap-4">
              <div className="w-full flex-1 xl:w-auto xl:flex-none">
                <CommandMenu />
              </div>
              
              <nav className="flex items-center">
                {user?.user && (
                  <AuthDropdown user={user} />
                )}
              </nav>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}