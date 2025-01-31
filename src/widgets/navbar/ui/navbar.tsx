import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth";
import { MaxWidthWrapper } from "@/shared/ui";

import { ResponsiveNavbar } from "./responsive-navbar";
import { SearchPagesBar } from "./search-pages-bar";
import { UserAuthDropdown } from "./user-auth-dropdown";

export async function Navbar() {
  const user = await getServerSession(authOptions);

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-16 bg-white shadow-sm">
      <MaxWidthWrapper className="flex h-full items-center">
        <ResponsiveNavbar />
        <div className="ml-4 flex w-full items-center gap-2 lg:items-center lg:justify-end xl:w-auto">
          <SearchPagesBar />
          {user?.user && <UserAuthDropdown user={user} />}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
