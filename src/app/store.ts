import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import gitReducer from '../features/git/slice';

export const store = configureStore({
  reducer: {
    git: gitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export enum RequestStatus {
  NONE,
  REQUESTED,
  SUCCESS,
  FAIL,
}
