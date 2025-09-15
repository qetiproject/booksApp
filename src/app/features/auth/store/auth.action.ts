import { createAction, props } from "@ngrx/store";
import { LoginCredentials, User } from "../types/user";
import { AuthTokens } from "./auth.store";

export const login = createAction('[Auth] login', props<LoginCredentials>());
export const loginSuccess = createAction('[Auth] login success', props<{user: User, tokens: AuthTokens}>());
export const loginFailure = createAction('[Auth] login failure', props<{error: string}>());

export const logout = createAction('[Auth] logout')

export const userProfile = createAction('[Auth] user profile ');
export const userProfileSuccess = createAction('[Auth] user profile success', props<{user: User}>());
export const userProfileFailure = createAction('[Auth] user profile failure', props<{error: string}>());