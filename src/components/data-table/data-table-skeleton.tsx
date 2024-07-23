import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  columnCount: number;

  /**
   * @default 10
   */
  rowCount?: number;

  /**
   * The number of searchable columns in the table.
   * @default 0
   */
  searchableColumnCount?: number;

  /**
   * The number of filterable columns in the table.
   * @default 0
   */
  filterableColumnCount?: number;

  /**
   * Flag to show the table view options.
   * @default true
   */
  showViewOptions?: boolean;

  /**
   * The width of each cell in the table.
   * The length of the array should be equal to the columnCount.
   * Any valid CSS width value is accepted.
   * @default ["auto"]
   */
  cellWidths?: string[];

  /**
   * Flag to show the pagination bar.
   * @default true
   */
  withPagination?: boolean;

  /**
   * Flag to prevent the table cells from shrinking.
   * @default false
   */
  shrinkZero?: boolean;
}

export function DataTableSkeleton(props: DataTableSkeletonProps) {
  const {
    columnCount,
    rowCount = 10,
    filterableColumnCount = 0,
    searchableColumnCount = 0,
    showViewOptions = true,
    cellWidths = ["auto"],
    withPagination = true,
    shrinkZero = false,
    className,
    ...skeletonProps
  } = props;

  return (
    <div
      className={cn("w-full space-y-2.5 overflow-auto", className)}
      {...skeletonProps}
    >
      <div className="flex w-full items-center justify-between space-x-2">
        <div className="flex w-full items-center gap-2">
          <div className="flex w-full items-center justify-center overflow-auto space-x-2">
            <div className="flex flex-1 items-center space-x-2">
              {searchableColumnCount > 0 &&
                Array.from({ length: searchableColumnCount }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-40 lg:w-60" />
                ))}
              {filterableColumnCount > 0 &&
                Array.from({ length: filterableColumnCount }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-[4.5rem] border-dashed" />
                ))}
            </div>
            <div className="flex items-center gap-2">
              {showViewOptions && (
                <Skeleton className="ml-auto h-10 w-20 hidden md:flex" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded border">
        <Table>
          <TableHeader>
            {Array.from({ length: 1 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableHead
                    key={j}
                    style={{
                      width: cellWidths[j],
                      minWidth: shrinkZero ? cellWidths[j] : "auto",
                    }}
                  >
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell
                    key={j}
                    style={{
                      width: cellWidths[j],
                      minWidth: shrinkZero ? cellWidths[j] : "auto",
                    }}
                  >
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {withPagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      )}
    </div>
  );
}
