import DashboardShell from "@/components/dashboard-shell";
import { Header } from "@/components/header";

import { FileUploadHolder } from "./_components/file-upload-holder";

export const metadata = {
  title: "Додавання файлу",
};

export default function UploadFilePage() {
  return (
    <DashboardShell>
      <Header heading="Додавання файлу" />
      <FileUploadHolder />
    </DashboardShell>
  );
}
