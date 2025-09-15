import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, from, switchMap, throwError } from "rxjs";
import { AuthService } from "../../features/auth/services/auth.service";

export const AuthInterceptor = 
(req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   
    const authService = inject(AuthService);
    const tokens = authService.getTokens();

    if (req.url.includes('/auth/') && tokens?.accessToken) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        })
        return next(cloned);
    }

    return next(req).pipe(
        catchError(err => {
            if(err.status === 401 && tokens?.refreshToken) {
                return from(authService.refreshToken(tokens?.refreshToken)).pipe(
                    switchMap((newAccessToken: string) => {
                        authService.updateAccessToken(newAccessToken);
                        const retryToken = req.clone({
                            setHeaders: {
                               Authorization: `Bearer ${newAccessToken}`
                            }
                        });
                        return next(retryToken)
                    })
                )
            }
            return throwError(() => err);
        })
    )
    

}