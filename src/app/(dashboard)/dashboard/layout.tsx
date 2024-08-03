import { DashboardNav } from "@/components/layouts/navbar/dashboard-nav";
import MaxWidthWrapper from "@/components/max-width-wrapper";

import { navConfig } from "@/config/nav";

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <MaxWidthWrapper>
        <div className="grid flex-1 gap-12 lg:grid-cols-[160px_1fr] my-7">
          <aside className="hidden w-170px flex-col lg:flex">
            <DashboardNav items={navConfig.dashboardNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}