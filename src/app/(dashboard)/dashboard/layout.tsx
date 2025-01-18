import { DashboardNav, NAV_CONFIG } from "@/widgets/navbar";
import { MaxWidthWrapper } from "@/shared/ui";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <MaxWidthWrapper>
        <div className="my-7 grid flex-1 gap-12 lg:grid-cols-[200px_1fr]">
          <aside className="w-170px hidden flex-col lg:flex">
            <DashboardNav items={NAV_CONFIG.dashboardNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col">{children}</main>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
