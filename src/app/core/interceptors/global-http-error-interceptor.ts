import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { MessageSeverity } from "@types";
import { catchError, retry, throwError } from "rxjs";
import { ErrorMessages } from "types/error.messages";
import { MessagesService } from "../services/messages.service";

export const GlobalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const messages = inject(MessagesService);

    return next(req).pipe(
        retry({count: 3, delay: 1000}),
        catchError((error: HttpErrorResponse) => {
                let message = '';

                switch (error.status) {
                    case 401:
                        message = ErrorMessages.E401;
                        break;
                    case 403:
                        message = ErrorMessages.E403;
                        break;
                    case 404:
                        message = ErrorMessages.E404;
                        break;
                    case 500:
                        message = ErrorMessages.E500;
                        break;
                    default:
                        message = ErrorMessages.Unknown;
                        break;
                }

                messages.showMessage({
                    text: message,
                    severity: MessageSeverity.Error,
                    duration: 5000
                });

                return throwError(() => error);
            })
    )
}