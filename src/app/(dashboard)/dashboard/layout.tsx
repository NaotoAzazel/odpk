import {
  DASHBOARD_SIDEBAR_BUTTONS,
  DashboardSidebar,
} from "@/widgets/dashboard-sidebar";
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
            <DashboardSidebar buttons={DASHBOARD_SIDEBAR_BUTTONS} />
          </aside>
          <main className="flex w-full flex-1 flex-col">{children}</main>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
