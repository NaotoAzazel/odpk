interface PaginationParams {
  /**
   * @default 1
   */
  page?: number;

  /**
   * @default 6
   */
  itemsPerPage?: number;
}

export interface PaginationMetadata {
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  metadata: PaginationMetadata;
}
