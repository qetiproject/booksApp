import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, from, switchMap, throwError } from "rxjs";
import { AuthService } from "../../features/auth/services/auth.service";

export const AuthInterceptor = 
(req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   
    const authService = inject(AuthService);
    const tokens = authService.getTokens();

    const authReq = req.url.includes('/auth/') &&  tokens?.accessToken
        ? req.clone({ setHeaders: { Authorization: `Bearer ${tokens.accessToken}` } })
        : req;

    return next(authReq).pipe(
        catchError(err => {
            if(err.status === 401 && tokens?.refreshToken) {
                return from(authService.refreshToken(tokens?.refreshToken)).pipe(
                    switchMap((newAccessToken: string) => {
                        authService.updateAccessToken(newAccessToken);
                        const retryReq = req.clone({
                            setHeaders: {
                               Authorization: `Bearer ${newAccessToken}`
                            }
                        });
                        return next(retryReq)
                    })
                )
            }
            return throwError(() => err);
        })
    )
    

}