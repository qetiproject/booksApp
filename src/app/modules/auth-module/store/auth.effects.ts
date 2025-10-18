import { Injectable, inject } from "@angular/core";
import { AuthService } from "@auth-services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
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
