export interface PaginationInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PaginatedResult<T> {
  content: T;
  pagination: PaginationInfo;
}
