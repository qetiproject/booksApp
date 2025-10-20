import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../services/auth.service";
import { RegisterUserRequest } from "../types/user";
import * as AuthActions from './auth.action';
import { login, loginFailure, loginSuccess, logout, userProfile, userProfileFailure, userProfileSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          tap( response => {
              sessionStorage.setItem(environment.ACCESS_TOKEN_KEY, response.accessToken);
              sessionStorage.setItem(environment.REFRESH_TOKEN_KEY, response.refreshToken);
              sessionStorage.setItem(environment.USER_STORAGE_KEY, JSON.stringify(response.user));
          }),
          map((response) =>
            loginSuccess({
              user: response.user,
              tokens: { 
                accessToken: response.accessToken, 
                refreshToken: response.refreshToken 
            }})
          ),
          catchError((error) =>
            of(loginFailure({ error: error.message || 'Login failed' }))
          )
        )
      )
    )
  );

  register$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.register),
      map(action => ({
        ...action.user,
        userId: Math.floor(Math.random() * 1000000)
      })),
      switchMap((user: RegisterUserRequest) =>
        this.authService.registerUser(user).pipe(
          map((response) => 
            AuthActions.registerSuccess({ response })
          ),
          catchError((error) => 
             of(AuthActions.registerFailure({ response: error }))
          )
        )
      )
    )
  )

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => this.authService.logout())
  ),{dispatch: false})


  userProfile$ = createEffect(() => this.actions$.pipe(
    ofType(userProfile),
    switchMap(() => 
      this.authService.getProfile().pipe(
        map((userProfileResponse) => userProfileSuccess({user: userProfileResponse})),
        catchError(error => of(userProfileFailure({ error: error.message || 'Failed to fetch profile' })))
      )
    )
  ))
}
