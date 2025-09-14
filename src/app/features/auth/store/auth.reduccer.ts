import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../types/user";
import { login, loginFailure, loginSuccess } from "./auth.action";

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
    }))
)