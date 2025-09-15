import { createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, logout, userProfileFailure, userProfileSuccess } from "./auth.action";
import { AuthState } from "./auth.store";

export const initialAuthState: AuthState = {
  user: null,         
  tokens: null,        
  isLoggedIn: false,   
  loading: false,      
  error: null          
};

export const AuthReducer = createReducer(
    initialAuthState,
    on(login, (state) => ({
        ...state,
        loading: true
    })),
    on(loginSuccess, (state, {user, tokens}) =>({
        ...state,
        user,
        tokens,
        isLoggedIn: true,
        loading: false
    })),
    on(loginFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(logout, (state) => ({
        ...state,
        user: null,
        tokens: null,
        isLoggedIn: false,
        loading: false,
        error: null
    })),
    on(userProfileSuccess, (state, { user }) => ({
        ...state,
        user,
        isLoggedIn: true,
    })),
    on(userProfileFailure, (state, { error }) => ({
        ...state,
        error,
        isLoggedIn: true,
    }))
)