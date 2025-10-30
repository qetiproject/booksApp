import { Injectable, inject } from "@angular/core";
import * as AuthActions from '@auth-module';
import { TokenStorageService } from "@auth-module";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthActions.AuthService);
  tokeService = inject(TokenStorageService);
  
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      map(action => ({
        ...action.user,
        userId: Math.floor(Math.random() * 1000000)
      })),
      switchMap((user: AuthActions.RegisterCredentionals) =>
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
      switchMap((user: AuthActions.LoginCredentials) =>
        this.authService.login(user).pipe(
          map((response: AuthActions.LoginResponse) => {
            this.tokeService.saveTokens(response.data.token)
            return AuthActions.loginSuccess({response, userId: response.data.userId, email: response.data.emailId})
          }),
          catchError(error =>  of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this.authService.logout())
  ),{dispatch: false})

}
