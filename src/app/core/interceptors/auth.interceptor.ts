// import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
// import { inject } from "@angular/core";
// import { Store } from "@ngrx/store";
// import { catchError, from, switchMap, throwError } from "rxjs";

// export const AuthInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
//   const authFacade = inject(AuthFacade);
//   const tokenStorageService = inject(TokenStorageService);
//   const store = inject(Store);

//   const refreshToken = tokenStorageService.getRefreshToken();
//   const accessToken = tokenStorageService.getAccessToken();

//   const protectedEndpoints = ['/auth/me'];
//   const needsAuth = protectedEndpoints.some(endpoint => req.url.includes(endpoint));

//   const authReq = needsAuth && accessToken
//     ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
//     : req;

//   return next(authReq).pipe(
//     catchError(err => {
//       if (err.status === 401 && refreshToken && needsAuth) {
//         return from(authFacade.refresh(refreshToken)).pipe(
//           switchMap((tokens: { accessToken: string; refreshToken: string }) => {
//             tokenStorageService.saveTokens(tokens.accessToken, tokens.refreshToken);
//             store.dispatch(updateTokensSuccess({ tokens }));
//             const retryReq = req.clone({
//               setHeaders: { Authorization: `Bearer ${tokens.accessToken}` }
//             });
//             return next(retryReq);
//           })
//         );
//       }
//       return throwError(() => err);
//     })
//   );
// };
