import { createAction, props } from "@ngrx/store";
import { LoginCredentials, LoginResponse, RegisterCredentionals, RegisterUserResponse } from "../types/user";

export const register = createAction(
  '[Auth] Register',
  props<{ user: RegisterCredentionals }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: RegisterUserResponse }>()
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const login = createAction(
  '[Auth] login', 
  props<LoginCredentials>()
);
export const loginSuccess = createAction(
  '[Auth] login success', 
  props<{response: LoginResponse}>()
);
export const loginFailure = createAction(
  '[Auth] login failure', 
  props<{error: string}>()
);

export const logout = createAction('[Auth] logout')

// export const userProfile = createAction('[Auth] user profile ');
// export const userProfileSuccess = createAction('[Auth] user profile success', props<{user: UserProfileResponse}>());
// export const userProfileFailure = createAction('[Auth] user profile failure', props<{error: string}>());