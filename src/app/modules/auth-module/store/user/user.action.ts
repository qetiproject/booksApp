import { Users } from "@auth-module";
import { createAction, props } from "@ngrx/store";

export const searchUsers = createAction(
    '[User] Search Users',
    props<{searchText: string}>()
)

export const searchUsersSuccess = createAction(
    '[User] Search Users Success',
    props<{response: Users}>()
)

export const searchUsersFailure = createAction(
    '[User] Search Users Failure',
    props<{error: string}>()
)