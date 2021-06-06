import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaginationInfo } from '../../../shared/models/pagination-info';
import { PollInfo } from '../models/poll-info';
import * as PollReducer from './poll.reducer';

export const selectPollState = createFeatureSelector<PollReducer.State>(
  PollReducer.pollsFeatureKey
);

export const selectAllPolls = createSelector(
  selectPollState,
  PollReducer.selectAll
);

export const selectAllEntities = createSelector(
  selectPollState,
  PollReducer.selectEntities
);

export const selectPagination = createSelector(
  selectPollState,
  (state: PollReducer.State) => state.pagination
);

export interface PollsViewModel {
  pagination: PaginationInfo;
  polls: PollInfo[];
}

export const selectPollsViewModel = createSelector(
  selectPagination,
  selectAllPolls,
  (pagination: PaginationInfo, polls: PollInfo[]): PollsViewModel => {
    return {
      pagination: pagination,
      polls: polls,
    };
  }
);

export const entityExists = createSelector(
  selectAllEntities,
  (entities, props): boolean => {
    return entities[props.createdBy.username] == undefined ? false : true;
  }
);

export const selectEntityById = createSelector(
  selectAllEntities,
  (entities, props) => entities[props.createdBy.username]
);
