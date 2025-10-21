import { createReducer, on } from "@ngrx/store";
import * as AuthActions from './auth.action';
import { login, loginFailure, loginSuccess, logout, registerFailure, registerSuccess } from "./auth.action";
import { AuthState } from "./auth.store";

export const initialAuthState: AuthState = {
    loading: false,
    isLoggedIn: false,
    response: null,
    error: null      
};

export const AuthReducer = createReducer(
    initialAuthState,
    on(AuthActions.register, (state) => ({
        ...state,
        loading: true,
        response: null
    })),
    on(registerSuccess, (state, {response}) =>({
        ...state,
        loading: false,
        response,
    })),
    on(registerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(login, (state) => ({
        ...state,
        isLoggedIn: false,
        loading: true,
    })),
    on(loginSuccess, (state, {response,}) =>({
        ...state,
        response,
        isLoggedIn: true,
        loading: false,
    })),
    on(loginFailure, (state, { error }) => ({
        ...state,
        error,
        response: null,
        loading: false
    })),
    on(logout, (state) => ({
        ...state,
        response: null,
        isLoggedIn: false,
        loading: false,
        error: null
    })),
    // on(userProfileSuccess, (state, { user }) => ({
    //     ...state,
    //     userProfile: user,
    //     isLoggedIn: true,
    // })),
    // on(userProfileFailure, (state, { error }) => ({
    //     ...state,
    //     error,
    //     isLoggedIn: false,
    //     user: null
    // }))
)