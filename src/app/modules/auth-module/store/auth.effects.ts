import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { LoginCredentials, LoginResponse, RegisterUserRequest } from "../types/user";
import * as AuthActions from './auth.action';
import { logout } from "./auth.action";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      map(action => ({
        ...action.user,
        userId: Math.floor(Math.random() * 1000000)
      })),
      switchMap((user: RegisterUserRequest) =>
        this.authService.registerUser(user).pipe(
          map((response) => AuthActions.registerSuccess({ response })),
          catchError((error) => of(AuthActions.registerFailure({ response: error })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((user: LoginCredentials) =>
        this.authService.login(user).pipe(
          map((response: LoginResponse) =>
            AuthActions.loginSuccess({response})
          ),
          catchError((error) => {
            console.log(error, "login error message from effect")
            return of(AuthActions.loginFailure({ error: error.message || 'Login failed' }))
          })
        )
      )
    )
  );

 

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => this.authService.logout())
  ),{dispatch: false})


  // userProfile$ = createEffect(() => this.actions$.pipe(
  //   ofType(userProfile),
  //   switchMap(() => 
  //     this.authService.getProfile().pipe(
  //       map((userProfileResponse) => userProfileSuccess({user: userProfileResponse})),
  //       catchError(error => of(userProfileFailure({ error: error.message || 'Failed to fetch profile' })))
  //     )
  //   )
  // ))
}
