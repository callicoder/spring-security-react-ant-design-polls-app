import { Action, createReducer, on } from '@ngrx/store';
// import { userInitialState, UserInfo } from './user.state';
// import * as UserActions from './user.actions';

// const reducer = createReducer(
//   userInitialState,
//   on(UserActions.getCurrentUserSuccess, (state, action) => ({
//     ...state,
//     user: action.user,
//   })),
//   on(UserActions.getCurrentUserFail, (state, _) => ({
//     ...state,
//   }))
// );

// export function UserReducer(
//   state: UserInfo | undefined,
//   action: Action
// ): UserInfo {
//   return reducer(state, action);
// }
