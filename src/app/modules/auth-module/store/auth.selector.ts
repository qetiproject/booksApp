import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.store";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserResponse = createSelector(
    selectAuthState,
    (state: AuthState) => state.response
)

export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.response?.data
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
    (state: AuthState) => state.response?.message
)

// export const selectUserProfile = createSelector(
//     selectAuthState,
//     (state: AuthState) => state.userProfile
// )

// export const selectTokens = createSelector(
//     selectAuthState,
//     (state: AuthState) => state.tokens
// )