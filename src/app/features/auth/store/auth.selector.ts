import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.store";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
)

export const selectTokens = createSelector(
    selectAuthState,
    (state: AuthState) => state.tokens
)

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLoggedIn
)

export const selectAuthloading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
)

export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
)