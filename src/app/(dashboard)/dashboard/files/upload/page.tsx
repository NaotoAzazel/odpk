import { Header } from "@/components/header";

import DashboardShell from "../../_components/dashboard-shell";
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
