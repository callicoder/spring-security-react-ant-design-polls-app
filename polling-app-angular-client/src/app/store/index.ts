import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './reducers/auth.reducer';
import * as fromPoll from '../modules/polls/state/poll.reducer';

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromPoll.pollsFeatureKey]: fromPoll.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromPoll.pollsFeatureKey]: fromPoll.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
