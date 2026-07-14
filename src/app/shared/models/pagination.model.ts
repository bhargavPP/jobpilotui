export interface PaginationRequest {

  pageNumber: number;

  pageSize: number;

  search?: string;

  sortColumn?: string;

  sortDirection?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {

  items: T[];

  totalCount: number;

  pageNumber: number;

  pageSize: number;

  totalPages: number;
}
