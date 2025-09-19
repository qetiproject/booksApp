import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, from, switchMap, throwError } from "rxjs";
import { AuthService } from "../../features/auth/services/auth.service";
import { AuthFacade } from "../../features/auth/services/authFacade";
import { TokenStorageService } from "../../features/auth/services/token.service";

export const AuthInterceptor = 
    (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   
    const authService = inject(AuthService);
    const authFacade = inject(AuthFacade);
    const tokenStorageService = inject(TokenStorageService);
    const refreshToken = tokenStorageService.getRefreshToken();
    const accessToken = tokenStorageService.getAccessToken();

    const authReq = req.url.includes('/auth/') &&  accessToken
        ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
        : req;

    return next(authReq).pipe(
        catchError(err => {
            if(err.status === 401 && refreshToken) {
                return from(authFacade.refresh(refreshToken)).pipe(
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