import { ColumnDef } from "@tanstack/react-table";

export type CustomColumnMeta = {
  translatedName: string;
};

export type CustomColumnDef<TData> = ColumnDef<TData> & {
  meta?: CustomColumnMeta;
};
