import { createAction, props } from '@ngrx/store';
import { PollInfo } from '../models/poll-info';
import { PaginatedResult } from './polls.state';

export const loadPolls = createAction(
  '[polls] Load Polls',
  props<{ page: number; size: number }>()
);

export const loadPollsSuccess = createAction(
  '[polls] Load Polls Success',
  props<{ paginatedResult: PaginatedResult<PollInfo[]> }>()
);

export const loadPollsFailure = createAction(
  '[polls] Load Polls Failure',
  props<{ error: any }>()
);
