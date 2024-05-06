import DashboardShell from "../../_components/dashboard-shell";
import { DashboardHeader } from "../../_components/dashboard-header";

import { DataTable } from "../../_components/table/data-table";
import { columns } from "../../_components/table/columns";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { getNews } from "@/lib/actions/news";

export default async function DashboardNewsPage() {
  const data = await getNews();

  return (
    <DashboardShell className="px-1">
      <DashboardHeader heading="Доступнi новини">
        {/** TODO: Put the code below in a separate news-create-button */}
        <Button>
          <Icons.plus className="mr-2 w-4 h-4" />
          Новина
        </Button>
      </DashboardHeader>

      <DataTable columns={columns} data={data} />
    </DashboardShell>
  )
}