import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../features/auth/services/auth.service";

export const AuthInterceptor = 
(req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   
    const authService = inject(AuthService);
    const tokens = authService.getTokens();

    if (req.url.includes('/auth/')) {
        if(tokens?.accessToken) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokens.accessToken}`
                }
            })
            return next(cloned);
        }
    }

    return next(req);
    

}