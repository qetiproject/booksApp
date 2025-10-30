import * as UserActions from '@auth-module';
import { UserState } from "@auth-module";
import { createReducer, on } from "@ngrx/store";

export const initialUserState: UserState = {
    loading: false,
    error: null,
    response: {
        totalRecords: 0,
        pageNumber: 0,
        pageSize: 0,
        data: []
    }
}

export const UserReducer = createReducer(
    initialUserState,
    on(UserActions.searchUsers, (state) => ({
        ...state,
        loading: true,
    })),
    on(UserActions.searchUsersSuccess, (state, { response }) => ({
        ...state,
        loading: false,
        response
    })),
    on(UserActions.searchUsersFailure, (state, { error}) => ({
        ...state,
        loading: false,
        error,
        response: {
            totalRecords: 0,
            pageNumber: 0,
            pageSize: 0,
            data: []
        }
    }))
)