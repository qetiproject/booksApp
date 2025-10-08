import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, retry, tap, throwError } from "rxjs";
import { MessageSeverity } from "../../types/common";
import { MessagesService } from "../services/messages.service";

export const GlobalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const messages = inject(MessagesService);

    return next(req).pipe(
        retry({count: 3, delay: 1000}),
        tap({
            error: (error: HttpErrorResponse) => {
                messages.showMessage({
                    text: error.message, 
                    severity: MessageSeverity.Error,
                    duration: 5000
                });
            }
        }),
        catchError((error: HttpErrorResponse) => {
            const message = error.error?.message ?? 'Unexpected error';
            messages.showMessage({
                text: message, 
                severity: MessageSeverity.Error,
                duration: 5000
            });
            return throwError(() => error);
        })
    )
}