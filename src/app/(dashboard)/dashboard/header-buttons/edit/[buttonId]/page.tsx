import { DashboardEditButtonByIdPage } from "@/views/dashboard/header-buttons-edit-by-id";

interface PageProps {
  params: {
    buttonId: string;
  };
}

export default async function Page({ params }: PageProps) {
  return <DashboardEditButtonByIdPage params={params} />;
}
