import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { PollInfo } from '../models/poll-info';
import { PaginatedResult } from '../../../shared/models/pagination-info';

export const loadPolls = createAction(
  '[Poll List Component] Load Polls',
  props<{ page: number; size: number }>()
);

export const loadPollsSuccess = createAction(
  '[Poll Effect] Load Polls Success',
  props<{ paginatedResult: PaginatedResult<PollInfo[]> }>()
);

export const loadPollsFailure = createAction(
  '[Poll Effect] Load Polls Failure',
  props<{ error: any }>()
);

export const addPoll = createAction(
  '[Poll/API] Add Poll',
  props<{ poll: PollInfo }>()
);

export const upsertPoll = createAction(
  '[Poll/API] Upsert Poll',
  props<{ poll: PollInfo }>()
);

export const addPolls = createAction(
  '[Poll/API] Add Polls',
  props<{ polls: PollInfo[] }>()
);

export const upsertPolls = createAction(
  '[Poll/API] Upsert Polls',
  props<{ polls: PollInfo[] }>()
);

export const updatePoll = createAction(
  '[Poll/API] Update Poll',
  props<{ poll: Update<PollInfo> }>()
);

export const updatePolls = createAction(
  '[Poll/API] Update Polls',
  props<{ polls: Update<PollInfo>[] }>()
);

export const deletePoll = createAction(
  '[Poll/API] Delete Poll',
  props<{ id: string }>()
);

export const deletePolls = createAction(
  '[Poll/API] Delete Polls',
  props<{ ids: string[] }>()
);

export const clearPolls = createAction('[Poll/API] Clear Polls');
