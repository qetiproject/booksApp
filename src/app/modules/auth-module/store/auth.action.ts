import { createAction, props } from "@ngrx/store";
import { LoginCredentials, RegisterUserRequest, User } from "../types/user";
import { UserProfileResponse } from "../types/user-profile";
import { AuthTokens } from "./auth.store";

export const login = createAction('[Auth] login', props<LoginCredentials>());
export const loginSuccess = createAction('[Auth] login success', props<{user: User, tokens: AuthTokens}>());
export const loginFailure = createAction('[Auth] login failure', props<{error: string}>());

export const register = createAction('[Auth] register', props<RegisterUserRequest>());
export const registerSuccess = createAction('[Auth] register success', props<{user: User, tokens: AuthTokens}>());
export const registerFailure = createAction('[Auth] register failure', props<{error: string}>());

export const logout = createAction('[Auth] logout')

export const userProfile = createAction('[Auth] user profile ');
export const userProfileSuccess = createAction('[Auth] user profile success', props<{user: UserProfileResponse}>());
export const userProfileFailure = createAction('[Auth] user profile failure', props<{error: string}>());

export const updateTokensSuccess = createAction(
    '[Auth] Update Tokens Success',
    props<any>()
);

export const updateTokensFailure = createAction(
    '[Auth]  Update Tokens Failure',
    props<{error: string}>()
);