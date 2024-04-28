import MainNav from "@/components/layouts/main-nav";
import MobileNav from "@/components/layouts/mobile-nav";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";

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
              
              {/** TODO: Add user-dropdown-menu */}
              <nav className="flex items-center">
                {user?.user && (
                  <Button variant="ghost">
                    <Icons.user className="h-4 w-4" />
                  </Button>
                )}
              </nav>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}