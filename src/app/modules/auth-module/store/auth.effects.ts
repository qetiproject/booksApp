import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { MessagesService } from "@core/services/messages.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageSeverity } from "@types";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { LoginCredentials, LoginResponse, RegisterCredentionals } from "../types/user";
import * as AuthActions from './auth.action';
import { logout } from "./auth.action";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  messages = inject(MessagesService);
  
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
          catchError(error => {
            console.log(error, "error")
            let message = ''
            if (error.status === 404) {
              message = 'Login service not found. Please contact support.';
            } else if (error.status === 0) {
              message = 'Cannot connect to the server. Please check your internet connection.';
            }

            this.messages.showMessage({
              text: message,
              severity: MessageSeverity.Error,
              duration: 5000
            });
            return of(AuthActions.registerFailure({ error: message }))
          })
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
          catchError((error: HttpErrorResponse) => {
            let message = ''
            if (error.status === 401) {
              message = 'Unable to log in. Check your email and password.';
            }else if (error.status === 404) {
              message = 'Login service not found. Please contact support.';
            } else if (error.status === 0) {
              message = 'Cannot connect to the server. Please check your internet connection.';
            }

            this.messages.showMessage({
              text: message,
              severity: MessageSeverity.Error,
              duration: 5000
            });
            return of(AuthActions.loginFailure({ error: message }))
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
