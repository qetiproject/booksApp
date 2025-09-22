import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, retry, tap, throwError } from "rxjs";

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    // const snackbar = inject(MatSnackBar)

    return next(req).pipe(
        retry({count: 3, delay: 1000}),
        tap({
            error: (error: HttpErrorResponse) => {
                // snackbar.open(error.message, 'close', {
                //     duration: 5000
                // })
            }
        }),
        catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
        })
    )
}