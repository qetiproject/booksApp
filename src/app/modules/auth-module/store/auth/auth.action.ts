import { LoginCredentials, LoginResponse, RegisterCredentionals, RegisterUserResponse } from "@auth-module";
import { createAction, props } from "@ngrx/store";

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
  props<{response: LoginResponse, userId: number, email: string}>()
);
export const loginFailure = createAction(
  '[Auth] login failure', 
  props<{error: string}>()
);

export const logout = createAction('[Auth] logout')