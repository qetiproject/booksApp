import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { login, loginFailure, loginSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
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
}
