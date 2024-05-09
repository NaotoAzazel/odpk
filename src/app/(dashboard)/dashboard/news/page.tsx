import DashboardShell from "../../_components/dashboard-shell";
import { DashboardHeader } from "../../_components/dashboard-header";
import { NewsCreateButton } from "../../_components/news-create-button";

import { DataTable } from "../../_components/table/data-table";
import { columns } from "../../_components/table/columns";

import { getNews } from "@/lib/actions/news";

export default async function DashboardNewsPage() {
  const data = await getNews();

  return (
    <DashboardShell className="px-1">
      <DashboardHeader heading="Доступнi новини">
        <NewsCreateButton />
      </DashboardHeader>

      <DataTable columns={columns} data={data} />
    </DashboardShell>
  )
}