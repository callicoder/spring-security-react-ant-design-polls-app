import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as PollActions from './poll.actions';
import { PollInfo } from '../models/poll-info';
import { PaginationInfo } from '../../../shared/models/pagination-info';

export const pollsFeatureKey = 'polls';

export interface State extends EntityState<PollInfo> {
  // additional entities state properties
  pagination: PaginationInfo;
  error: any;
}

export const adapter: EntityAdapter<PollInfo> = createEntityAdapter<PollInfo>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  pagination: null,
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(PollActions.loadPollsSuccess, (state, action) =>
    adapter.setAll(action.paginatedResult.content, {
      ...state,
      pagination: action.paginatedResult.pagination,
    })
  ),
  on(PollActions.loadPollsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PollActions.addPoll, (state, action) =>
    adapter.addOne(action.poll, state)
  ),
  on(PollActions.upsertPoll, (state, action) =>
    adapter.upsertOne(action.poll, state)
  ),
  on(PollActions.addPolls, (state, action) =>
    adapter.addMany(action.polls, state)
  ),
  on(PollActions.upsertPolls, (state, action) =>
    adapter.upsertMany(action.polls, state)
  ),
  on(PollActions.updatePoll, (state, action) =>
    adapter.updateOne(action.poll, state)
  ),
  on(PollActions.updatePolls, (state, action) =>
    adapter.updateMany(action.polls, state)
  ),
  on(PollActions.deletePoll, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(PollActions.deletePolls, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(PollActions.clearPolls, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
