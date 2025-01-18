"use client";

import { ActionButton } from "./action-button";
import { ActionButtonWithHref, ActionButtonWithOnClick } from "./types";

interface LinkToButtonProps extends ActionButtonWithHref {}

function LinkToButton({
  href,
  whenChangeDisplayMode = "md",
}: LinkToButtonProps) {
  return (
    <ActionButton
      icon="openLink"
      text="Відкрити"
      href={href}
      whenChangeDisplayMode={whenChangeDisplayMode}
    />
  );
}

interface EditButtonProps extends ActionButtonWithHref {}

function EditButton({ href, whenChangeDisplayMode = "md" }: EditButtonProps) {
  return (
    <ActionButton
      icon="pencil"
      text="Редагувати"
      href={href}
      whenChangeDisplayMode={whenChangeDisplayMode}
    />
  );
}

interface DeleteButtonProps extends ActionButtonWithOnClick {}

function DeleteButton({
  onClick,
  whenChangeDisplayMode = "md",
}: DeleteButtonProps) {
  return (
    <ActionButton
      icon="trash"
      text="Видалити"
      onClick={onClick}
      className="text-destructive hover:text-destructive"
      whenChangeDisplayMode={whenChangeDisplayMode}
    />
  );
}

export { LinkToButton, EditButton, DeleteButton };
