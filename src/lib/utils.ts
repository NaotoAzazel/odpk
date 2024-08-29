import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat("uk-UA", {
    year: options.year ?? "numeric",
    month: options.month ?? "numeric",
    day: options.day ?? "numeric",
    ...options,
  }).format(new Date(date));
}

export const createCacheKey = (key: string) => `${key}:${env.NODE_ENV}`;
