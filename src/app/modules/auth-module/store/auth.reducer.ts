import { createReducer, on } from "@ngrx/store";
import * as AuthActions from './auth.action';
import { login, loginFailure, loginSuccess, logout, registerFailure, registerSuccess, updateTokensSuccess, userProfileFailure, userProfileSuccess } from "./auth.action";
import { AuthState } from "./auth.store";

export const initialAuthState: AuthState = {
    loading: false,
    userRegistered: null      
};

export const AuthReducer = createReducer(
    initialAuthState,
    on(AuthActions.register, (state) => ({
        ...state,
        loading: true,
        userRegistered: null
    })),
    on(registerSuccess, (state, {response}) =>({
        ...state,
        loading: false,
        userRegistered: response,
    })),
    on(registerFailure, (state, { response }) => ({
        ...state,
        loading: false,
        userRegistered: response
    })),
    on(login, (state) => ({
        ...state,
        isLoggedIn: false,
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
    on(updateTokensSuccess, (state, { tokens}) => ({
        ...state,
        tokens
    })),
    on(userProfileSuccess, (state, { user }) => ({
        ...state,
        userProfile: user,
        isLoggedIn: true,
    })),
    on(userProfileFailure, (state, { error }) => ({
        ...state,
        error,
        isLoggedIn: false,
        user: null
    }))
)