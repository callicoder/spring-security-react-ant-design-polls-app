import { PollsState, POLLS_STATE_NAME } from './polls.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectPollState = createFeatureSelector<PollsState>(POLLS_STATE_NAME);

export const getPolls = createSelector(selectPollState, (state) => {
  return state.polls;
});

export const getPagination = createSelector(selectPollState, (state) => {
  return state.pagination;
});
