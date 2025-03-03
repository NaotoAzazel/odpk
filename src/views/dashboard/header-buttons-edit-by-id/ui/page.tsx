"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import {
  getHeaderButtonById,
  HEADER_BUTTONS_QUERY_BASE_KEY,
} from "@/entities/header-button";
import { DashboardShell, Title } from "@/shared/ui";

import { ButtonContainer } from "./button-container";
import { DashboardEditButtonByIdLoading } from "./loading";
import { SubButtonsContainer } from "./sub-buttons-container";

interface DashboardEditButtonByIdPageProps {
  params: {
    buttonId: string;
  };
}

export function DashboardEditButtonByIdPage({
  params,
}: DashboardEditButtonByIdPageProps) {
  const {
    data: button,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [HEADER_BUTTONS_QUERY_BASE_KEY, params.buttonId],
    queryFn: () => getHeaderButtonById(Number(params.buttonId)),
  });

  if (isLoading) {
    return <DashboardEditButtonByIdLoading />;
  }

  if (isError) {
    return <p>error</p>;
  }

  if (!button) {
    return notFound();
  }

  return (
    <DashboardShell>
      <Title heading="Редагування кнопки" />
      <ButtonContainer button={button} />
      <SubButtonsContainer button={button} />
    </DashboardShell>
  );
}
