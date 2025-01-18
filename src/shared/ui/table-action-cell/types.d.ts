export type DisplayMode = "sm" | "md" | "lg" | "xl" | "";

export interface BaseActionButton {
  whenChangeDisplayMode?: DisplayMode;
}

export interface ActionButtonWithHref extends BaseActionButton {
  href: string;
}

export interface ActionButtonWithOnClick extends BaseActionButton {
  onClick: () => void;
}
