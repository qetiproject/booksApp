import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenStorageService } from "@auth-module";

export const AuthInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const tokenStorageService = inject(TokenStorageService);

  const protectedEndpoints = ['/auth/me'];
  const needsAuth = protectedEndpoints.some(endpoint => req.url.includes(endpoint));

  const accessToken = tokenStorageService.getAccessToken();
  const authReq = needsAuth && accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authReq);
};
