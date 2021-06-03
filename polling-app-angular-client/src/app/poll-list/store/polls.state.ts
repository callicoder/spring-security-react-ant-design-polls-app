import { PollInfo } from '../models/poll-info';

export const POLLS_STATE_NAME = 'polls';

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

export interface PollsState {
  polls: PollInfo[] | null;
  pagination: PaginationInfo;
  // readonly [POLLS_STATE_NAME]: PaginatedResult<PollInfo[]>;
}

export const initialState: PollsState = {
  polls: null,
  pagination: {
    page: 0,
    size: 4,
    totalElements: undefined,
    totalPages: undefined,
    last: undefined,
  },
};
