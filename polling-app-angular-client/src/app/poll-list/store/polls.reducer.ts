import { initialState, PollsState } from './polls.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as PollsActions from './polls.actions';

const _pollsReducer = createReducer(
  initialState,
  on(PollsActions.loadPollsSuccess, (state, action) => ({
    ...state,
    polls: action.paginatedResult.content,
    pagination: action.paginatedResult.pagination,
  }))
);

export function PollsReducer(state: PollsState, action: Action) {
  return _pollsReducer(state, action);
}
