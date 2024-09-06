"use client";

import { Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface TableInputSearchProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  table: Table<T>;
  searchByColumnName: StringKeys<T>;
  placeholder?: string;
}

/**
 * **IMPORTANT**: if the searched field is not added to the
 * table columns, there will be an error
 */
export function TableInputSearch<T>({
  table,
  searchByColumnName,
  placeholder = "Введіть заголовок...",
  className,
  ...props
}: TableInputSearchProps<T>) {
  const column = table.getColumn(searchByColumnName as string);
  if (!column) {
    console.warn(
      `Column "${searchByColumnName.toString()}" not found in the table. Please ensure the column exists.`,
    );
    return (
      <Input
        placeholder="Колонка не знайдена"
        className={cn("max-w-sm focus-visible:ring-0", className)}
        disabled
        {...props}
      />
    );
  }

  return (
    <Input
      placeholder={placeholder}
      value={(column?.getFilterValue() as string) ?? ""}
      onChange={(event) => column?.setFilterValue(event.target.value)}
      className={cn("max-w-sm focus-visible:ring-0", className)}
      {...props}
    />
  );
}
