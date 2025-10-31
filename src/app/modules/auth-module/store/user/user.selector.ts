import { UserState } from "@auth-module";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectSearchUsers = createSelector(
    selectUserState,
    (state: UserState) => state.response
)
