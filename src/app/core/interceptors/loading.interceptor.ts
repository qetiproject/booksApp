import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingService } from "@core/services/loading.service";
import { SkipLoading } from "@features/loading/skip-loading.component";
import { finalize } from "rxjs";

export const LoadingInterceptor = 
    (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
        if(req.context.get(SkipLoading)) {
            return next(req);
        }
        const loadingService = inject(LoadingService);
        loadingService.loadingOn();
        return next(req)
            .pipe(
                finalize(() => {
                    loadingService.loadingOff()
                })
            )
}