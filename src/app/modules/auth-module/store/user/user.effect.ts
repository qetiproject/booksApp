import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import * as UserActions from '@auth-module';
import { Users, UserService } from "@auth-module";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs/internal/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";

@Injectable()
export class UserEffects {
    actions$ = inject(Actions);
    userService = inject(UserService);

    searchUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.searchUsers),
            switchMap((action) =>
            this.userService.searchUsers(action.searchText).pipe(
                map((response: Users) => UserActions.searchUsersSuccess({ response })),
                catchError((error: HttpErrorResponse) => of(UserActions.searchUsersFailure({ error: error.message }))))
            )
        )
    );

}