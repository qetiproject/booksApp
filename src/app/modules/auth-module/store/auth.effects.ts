import { Injectable, inject } from "@angular/core";
import { TokenStorageService } from "@auth-services/token.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { LoginCredentials, LoginResponse, RegisterCredentionals } from "../types/user";
import * as AuthActions from './auth.action';
import { logout } from "./auth.action";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  tokeService = inject(TokenStorageService);
  
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      map(action => ({
        ...action.user,
        userId: Math.floor(Math.random() * 1000000)
      })),
      switchMap((user: RegisterCredentionals) =>
        this.authService.registerUser(user).pipe(
          map((response) => AuthActions.registerSuccess({ response })),
          catchError(error =>  of(AuthActions.registerFailure({ error }))
        ))
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((user: LoginCredentials) =>
        this.authService.login(user).pipe(
          map((response: LoginResponse) => {
            this.tokeService.saveTokens(response.data.token)
            return AuthActions.loginSuccess({response})
          }),
          catchError(error =>  of(AuthActions.loginFailure({ error })))
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
