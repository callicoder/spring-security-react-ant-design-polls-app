export interface Pagination {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PaginatedResult<T> {
  content: T | undefined;
  pagination: Pagination;
}

export interface PageRequest {
  page: number;
  size: number;
}
